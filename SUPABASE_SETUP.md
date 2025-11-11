# Supabase 配置指南

## 第一步：创建 Supabase 项目

### 1.1 访问 Supabase
- 打开浏览器，访问 [supabase.com](https://supabase.com)
- 点击 **"Start your project"** 或登录已有账户

### 1.2 创建新项目
- 点击 **"New Project"**
- 填写项目信息：
  - **Project name**: `my-blog` 或任意名称
  - **Database Password**: 设置强密码（务必保管）
  - **Region**: 选择离你最近的地区（如 Singapore、Tokyo）
  - **Pricing Plan**: 选择 **Free** 免费计划
- 点击 **"Create new project"**，等待 2-3 分钟项目初始化

### 1.3 获取凭证
项目创建完成后，在 **Settings → API** 中找到并复制以下三个值：
- **Project URL**: `https://xxx.supabase.co`
- **anon public**: `eyJxxx...`（匿名 Key）
- **Service Role**: `eyJxxx...`（服务密钥，需妥善保管）

---

## 第二步：建表与配置 RLS

### 2.1 打开 SQL Editor
- 在 Supabase Dashboard 左侧菜单，点击 **SQL Editor**
- 点击 **"New Query"**

### 2.2 创建 comments 表

复制以下 SQL 到编辑框并执行（点击 **"Run"** 或 Ctrl+Enter）：

```sql
-- 创建评论表
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  author_name text,
  author_email text,
  content text not null,
  created_at timestamptz not null default now(),
  deleted boolean not null default false
);

-- 创建索引加速查询
create index if not exists idx_comments_post_slug on public.comments(post_slug);
create index if not exists idx_comments_deleted on public.comments(deleted);

-- 启用 RLS
alter table public.comments enable row level security;

-- RLS 策略 1：所有人可以查看未删除的评论
create policy "select_comments" on public.comments
for select using (deleted = false);

-- RLS 策略 2：所有人可以插入评论
create policy "insert_comments" on public.comments
for insert with check (true);

-- RLS 策略 3：仅 admin 可以更新（用于软删除）
create policy "update_comments_admin" on public.comments
for update using (auth.jwt() ->> 'role' = 'admin')
with check (auth.jwt() ->> 'role' = 'admin');
```

✅ 执行后应显示 **"Success. No rows returned"**

### 2.3 创建 image_jobs 表

继续新建查询，复制以下 SQL：

```sql
-- 创建生图任务表
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

-- 创建索引
create index if not exists idx_image_jobs_user_id on public.image_jobs(user_id);
create index if not exists idx_image_jobs_created_at on public.image_jobs(created_at);

-- 启用 RLS
alter table public.image_jobs enable row level security;

-- RLS 策略 1：用户仅可查看自己的任务或 admin 可查看所有
create policy "select_image_jobs" on public.image_jobs
for select using (
  user_id = auth.uid() or auth.jwt() ->> 'role' = 'admin'
);

-- RLS 策略 2：登录用户可插入任务
create policy "insert_image_jobs" on public.image_jobs
for insert with check (user_id = auth.uid());

-- RLS 策略 3：用户可更新自己的任务或 admin 可更新所有
create policy "update_image_jobs" on public.image_jobs
for update using (
  user_id = auth.uid() or auth.jwt() ->> 'role' = 'admin'
);
```

✅ 执行成功

---

## 第三步：创建 Storage Bucket

### 3.1 打开 Storage 页面
- 在左侧菜单点击 **Storage**
- 点击 **"Create a new bucket"**

### 3.2 配置 Bucket
- **Bucket name**: `images`
- **Public bucket**: 选择 ✅ **勾选**（允许公开访问）
- 点击 **"Create bucket"**

### 3.3 配置访问权限（可选）
- 点击 `images` Bucket
- 在 **Policies** 标签，点击 **"New policy"**
- 选择 **"For full customization, use the SQL editor below"**
- 复制以下 SQL：

```sql
-- 允许认证用户上传文件到各自的目录
create policy "allow_authenticated_upload"
on storage.objects for insert
with check (
  auth.role() = 'authenticated'
  and bucket_id = 'images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- 允许所有人读取（因为是公开 bucket）
create policy "allow_public_read"
on storage.objects for select
using (bucket_id = 'images');
```

---

## 第四步：配置用户角色（admin 标识）

### 4.1 为你的账户设置 admin 角色

在 SQL Editor 新建查询：

```sql
-- 获取你的用户 ID
select id, email from auth.users limit 5;
```

找到你的用户 ID（假设为 `abc-123-def`），然后执行：

```sql
-- 更新 JWT 元数据以标记为 admin
update auth.users
set raw_app_meta_data = jsonb_set(
  coalesce(raw_app_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'::jsonb
)
where id = 'abc-123-def';  -- 替换为你的用户 ID
```

✅ 之后你就是 admin，可以删除评论了

---

## 第五步：配置本地环境变量

### 5.1 创建 .env.local 文件

在项目根目录创建 `.env.local`（注意：这个文件 Git 会忽略，不会上传）：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 网站配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=My Blog

# ComfyUI 集成（暂时可留空）
COMFYUI_API_URL=https://your-comfyui-api.com
COMFYUI_API_KEY=your-api-key

# 图片保留天数
IMAGE_RETENTION_DAYS=30
```

**将以下值替换为你的 Supabase 凭证：**
- `NEXT_PUBLIC_SUPABASE_URL`：Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`：anon public key
- `SUPABASE_SERVICE_ROLE`：Service Role key

---

## 第六步：本地测试

### 6.1 安装依赖
```bash
cd D:\weixin_app\my_blog
npm install
```

### 6.2 启动开发服务器
```bash
npm run dev
```

输出应显示：
```
> my_blog@1.0.0 dev
> next dev

  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local
```

### 6.3 测试功能

#### 测试首页
- 打开 `http://localhost:3000`
- 应看到欢迎页面、文章列表、项目列表

#### 测试注册
- 点击 **"登录"** → 点击 **"注册"**
- 填写邮箱（如 `test@example.com`）和密码
- 点击 **"注册"**

#### 测试登录
- 用刚注册的账户登录
- 应跳转到 `/tools/image`（生图工具页）

#### 测试生图工具
- 输入提示词（如 "a beautiful sunset"）
- 点击 **"生成图片"**
- 应显示"已提交，处理中..."
- 历史记录中应出现新任务

#### 测试评论
- 打开文章详情页（如 `http://localhost:3000/posts/welcome`）
- 在底部填写评论表单，点击提交
- 评论应即时显示

---

## 第七步：部署到 Vercel

### 7.1 推送到 GitHub
```bash
git add .
git commit -m "Initial blog setup"
git push origin 1-personal-blog
```

### 7.2 在 Vercel 部署

1. 访问 [vercel.com](https://vercel.com)
2. 点击 **"Import Project"**
3. 选择你的 GitHub 仓库
4. 点击 **"Import"**
5. 在 **Environment Variables** 中填写：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE`
   - `COMFYUI_API_URL`
   - `COMFYUI_API_KEY`
   - 其他配置
6. 点击 **"Deploy"**

### 7.3 绑定自定义域名

1. 部署完成后，进入 **Settings → Domains**
2. 点击 **"Add Domain"**
3. 输入 `www.leik1000.xyz`
4. 点击 **"Add"**
5. 按指示在你的域名 DNS 提供商添加 CNAME：
   ```
   www CNAME cname.vercel-dns.com
   ```
6. 等待 DNS 生效（通常 5-30 分钟）

---

## 常见问题

### Q1: 我找不到 API 密钥在哪里？
**A**: 在 Supabase Dashboard 左侧菜单 → **Settings** → **API**，找到 **Project URL** 和 **API keys** 部分。

### Q2: RLS 策略执行失败怎么办？
**A**: 
- 检查 SQL 语法是否正确
- 确保表名为 `public.comments` 和 `public.image_jobs`
- 逐条执行 SQL，找出错误的那条
- 检查是否已启用 RLS（`alter table ... enable row level security`）

### Q3: 注册成功但登录失败？
**A**:
- Supabase 默认需要邮箱验证；可在 **Authentication → Providers** → **Email** 中禁用（设置为 **Disable email confirmations**）
- 或在邮件中点击验证链接

### Q4: 生图工具页显示 401？
**A**:
- 确保已正确登录
- 检查 `.env.local` 中 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 是否正确
- 检查浏览器 console 的错误信息

### Q5: Storage 上传失败？
**A**:
- 确保 bucket 名为 `images` 且已创建
- 检查 bucket 的 RLS 策略是否正确
- 确保用户已登录

---

## 快速检查清单

- [ ] Supabase 项目已创建
- [ ] 已获取 `Project URL`, `Anon Key`, `Service Role`
- [ ] 执行了 `comments` 表 SQL
- [ ] 执行了 `image_jobs` 表 SQL
- [ ] 创建了 `images` Storage Bucket
- [ ] 为自己的账户设置了 `admin` 角色
- [ ] 创建了 `.env.local` 文件并填写凭证
- [ ] 运行 `npm install` 安装依赖
- [ ] 运行 `npm run dev` 启动开发服务器
- [ ] 测试了注册、登录、生图、评论功能
- [ ] 推送到 GitHub 并部署到 Vercel
- [ ] 配置了 DNS 与自定义域名

---

## 需要帮助？

如果遇到问题，检查：
1. **Supabase 日志**: Dashboard → **Logs** 查看错误
2. **浏览器 DevTools**: F12 打开，查看 Console 与 Network 标签
3. **Next.js 日志**: 服务器终端输出

祝配置顺利！ 🚀

