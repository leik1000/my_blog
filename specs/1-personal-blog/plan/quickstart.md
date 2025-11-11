# Quickstart（Supabase + Vercel + 域名）

## 1. 准备仓库结构
```
my_blog/
  content/
    posts/...
    projects/...
  specs/1-personal-blog/...
  (后续实现会补充 pages/app, api 等源码)
```

## 2. 创建 Supabase 项目
1) 登录 supabase.com，新建项目（免费层即可）  
2) 记录 `SUPABASE_URL` 与 `ANON_KEY`、`SERVICE_ROLE`
3) SQL Editor 执行建表与 RLS（来自 data-model.md）  
4) 新建 Storage bucket：`images`（公开或签名 URL 访问，依据你偏好）

## 3. 配置 RLS（SQL 摘要）
参考 `specs/1-personal-blog/plan/data-model.md` 中的建表与 RLS 策略示例，先执行：
- 创建 `comments` 与 `image_jobs`
- 启用 RLS 并添加 select/insert/update 策略
- admin 判定：通过 JWT `role` 或映射表，确保博主账户为 admin

## 4. Vercel 项目与环境变量
1) 将仓库推送到 GitHub  
2) Vercel Import Project → 选择该仓库 → Framework 选 Next.js  
3) Settings → Environment Variables 填写：
   - `NEXT_PUBLIC_SITE_URL=https://www.leik1000.xyz`
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
   - `SUPABASE_SERVICE_ROLE=...`（仅 Serverless 使用）
   - `COMFYUI_API_URL=...`（你的公网 ComfyUI 根地址）
   - `COMFYUI_API_KEY=...`（如需要）
   - `IMAGE_RETENTION_DAYS=30`
4) 部署完成后可通过 Vercel 预览域名访问

## 5. 绑定自定义域名
1) Vercel → 项目 → Settings → Domains → Add `www.leik1000.xyz`  
2) 到域名 DNS 添加 CNAME：`www -> cname.vercel-dns.com`  
3) 等待生效（数分钟到数小时），Vercel 会自动签发证书

## 6. 本地开发
1) 拉取仓库  
2) 创建 `.env.local`，写入：
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE=...
COMFYUI_API_URL=...
COMFYUI_API_KEY=...
IMAGE_RETENTION_DAYS=30
```
3) `npm install && npm run dev`（后续代码实现完成后即可运行）

## 7. ComfyUI API 协议占位
- 约定 POST `/generate`：
  - 入参：`prompt`, `negative_prompt?`, `size`, `steps`
  - 出参：`{ job_id, status }`
- 约定 GET `/result/{job_id}`：
  - 出参：`{ status, result_url?, error? }`
- 以上仅作占位，实际以你的 ComfyUI 部署提供的 API 为准。我们在服务端代理中适配。

## 8. 上线前检查清单
- [ ] 首页/列表/详情/关于 页面无 404 与样式错位  
-, ] 评论发表/列表/删除符合预期（含频控）  
- [ ] 工具页（登录后）提交流程可用，状态反馈 ≤ 2s  
- [ ] Supabase 表与 RLS 生效，admin 角色验证通过  
- [ ] Storage 上传/访问正常，图片清理策略确认  
- [ ] SEO：`title/description/og`、`sitemap.xml`、`robots.txt`  
- [ ] Vercel 环境变量齐全，域名与证书有效


