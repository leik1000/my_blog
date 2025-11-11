# Phase 1 · Data Model（实体与校验）

## 概览
- 账号：Supabase Auth（用户含角色，admin/user）
- 内容：MDX（仓库内），不入库；仅用 frontmatter 构建索引
- 业务表（Supabase Postgres）：comments, image_jobs
- 对象存储（Supabase Storage）：images/

## 实体与字段

### User（Auth 托管）
- id: uuid（来自 supabase.auth.users）
- email: text
- role: enum('admin','user')（存于 auth metadata 或辅助映射表）

### Post（MDX，仅前端）
- slug: string（文件名）
- title: string（1..120）
- summary: string（0..240）
- date: ISO string
- tags: string[]
- cover: string (URL，可选)
- pinned: boolean（可选）

### ProjectUpdate（MDX，仅前端）
- 同 Post。频道区分用于导航与聚合。

### Comment（DB）
- id: uuid pk
- post_slug: text not null
- author_name: text null（1..40）
- author_email: text null（email 形态）
- content: text not null（1..1000）
- created_at: timestamptz default now()
- deleted: boolean default false

校验：
- content 长度 1..1000
- author_email（如提供）需符合 email 形态

RLS 策略：
- 查询：仅返回 deleted=false
- 插入：匿名/登录用户均可插入（保留 IP/指纹在日志层）
- 删除：仅 admin 可将 deleted 置为 true

### ImageJob（DB）
- id: uuid pk
- user_id: uuid not null（引用 auth.users.id）
- prompt: text not null（1..500）
- negative_prompt: text null（0..500）
- size: enum('512x512','768x768','1024x1024')
- steps: int not null（10..50）
- status: enum('queued','processing','succeeded','failed')
- result_url: text null（URL）
- duration_ms: int null（>=0）
- created_at: timestamptz default now()

校验：
- steps ∈ [10,50]；size ∈ 预设枚举
- prompt/negative_prompt 长度限制如上

RLS 策略：
- 查询：仅本人（user_id=auth.uid()）与 admin 可见
- 插入：登录用户可插入（user_id=auth.uid()）
- 更新：仅本人或 admin 可更新其记录（用于写入结果）

## 建表示例（SQL）
```sql
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  author_name text,
  author_email text,
  content text not null,
  created_at timestamptz not null default now(),
  deleted boolean not null default false
);
alter table public.comments enable row level security;

create table if not exists public.image_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  prompt text not null,
  negative_prompt text,
  size text not null check (size in ('512x512','768x768','1024x1024')),
  steps int not null check (steps between 10 and 50),
  status text not null check (status in ('queued','processing','succeeded','failed')),
  result_url text,
  duration_ms int,
  created_at timestamptz not null default now(),
  constraint fk_user foreign key (user_id) references auth.users (id) on delete cascade
);
alter table public.image_jobs enable row level security;
```

## RLS 策略示例（SQL）
```sql
-- comments 查询仅见未删除
create policy comments_select on public.comments
for select using (deleted = false);

-- comments 插入：允许匿名与登录用户（可结合 rpc 或 rate limit 控制）
create policy comments_insert on public.comments
for insert with check (true);

-- comments 删除（软删）：仅 admin（通过 jwt 中的 role 或映射表判断）
create policy comments_update_delete on public.comments
for update using (auth.jwt() ->> 'role' = 'admin')
with check (auth.jwt() ->> 'role' = 'admin');

-- image_jobs 查询：本人或 admin
create policy image_jobs_select on public.image_jobs
for select using (
  user_id = auth.uid() or auth.jwt() ->> 'role' = 'admin'
);

-- image_jobs 插入：仅登录用户
create policy image_jobs_insert on public.image_jobs
for insert with check (user_id = auth.uid());

-- image_jobs 更新：本人或 admin
create policy image_jobs_update on public.image_jobs
for update using (
  user_id = auth.uid() or auth.jwt() ->> 'role' = 'admin'
);
```

## Storage 组织
- bucket: `images`
- 路径：`user/{user_id}/{yyyy-mm}/{job_id}.png`
- 生命周期：30 天清理（可在后台策略或定时任务配置）


