# 实现任务拆分（1-personal-blog）

## 执行流程
- **Setup**: 初始化项目结构、依赖、Supabase 表/RLS
- **Phase 1 (Core)**: 页面骨架、内容渲染、认证
- **Phase 2 (Features)**: 评论、工具页（生图）
- **Phase 3 (Polish)**: SEO、分析、样式完善、上线前检查

---

## Phase 0：Setup（基础架构）

### 0.1 初始化 Next.js 项目 [P]
**描述**: 创建 Next.js 14+ 项目，安装依赖（next, react, supabase, tailwindcss 等）  
**文件**: package.json, next.config.js, tsconfig.json  
**输出**: 可运行的 npm run dev 环境  
**前置**: 无  
- [x] 创建 Next.js 项目结构（pages/app, api, lib, public 等）
- [x] 安装依赖：@supabase/supabase-js, @supabase/auth-helpers-nextjs, tailwindcss, markdown-to-jsx 等
- [x] 配置 tsconfig.json 与 tailwind
- [x] 创建 .env.local 模板

### 0.2 创建目录结构与文件骨架 [P]
**描述**: 创建内容目录 content/, components/, lib/, pages/ 等  
**文件**: 各目录及 README  
**输出**: 项目文件树就绪  
**前置**: 0.1 完成  
- [x] content/posts/, content/projects/ 目录
- [x] src/components/ 组件目录
- [x] src/lib/ 工具函数（Supabase 客户端、MDX 解析等）
- [x] pages/api/ API Route 目录
- [x] public/ 静态资源目录

### 0.3 配置 Supabase（表、RLS、Storage）
**描述**: 在 Supabase 项目中建表、启用 RLS、创建 Storage Bucket  
**文件**: Supabase 控制台  
**输出**: comments 表、image_jobs 表、RLS 策略、images Bucket 就绪  
**前置**: 无（并行）  
- [ ] 创建 Supabase 项目并记录 URL/KEY
- [ ] 在 SQL Editor 执行建表 SQL（comments, image_jobs）
- [ ] 启用 RLS 并添加所有策略（select/insert/update）
- [ ] 创建 Storage Bucket：images
- [ ] 记录 SUPABASE_URL, ANON_KEY, SERVICE_ROLE

### 0.4 创建 Supabase 客户端与认证上下文
**描述**: 初始化 Supabase 客户端、创建 Auth 提供者、钩子（useAuth、useUser）  
**文件**: lib/supabase.ts, hooks/useAuth.ts, context/AuthContext.tsx  
**输出**: 可在组件中使用 useAuth/useUser 钩子  
**前置**: 0.1、0.3 完成  
- [x] 创建 Supabase 客户端工厂（客户端与服务端分离）
- [ ] 实现 AuthProvider（React Context）
- [ ] 实现 useAuth 钩子（登录、注册、登出、获取用户信息）
- [ ] 实现 useUser 钩子（获取当前登录用户及角色）

### 0.5 配置 Vercel 环境变量与 .gitignore
**描述**: 为 Vercel 项目配置环保变量；为本地 Git 忽略敏感文件  
**文件**: .env.example, .gitignore  
**输出**: 环境变量清单、Git 忽略规则就绪  
**前置**: 0.3、0.4 完成  
- [x] 创建 .env.example（所有公开与私有变量模板）
- [x] 创建/更新 .gitignore（node_modules, .env*, dist, etc）
- [x] 准备 Vercel 环境变量列表（供后续 Dashboard 填写）

---

## Phase 1：Core Pages & Auth

### 1.1 实现页面路由与布局框架 [P]
**描述**: 创建主布局（Header/Nav/Footer）、页面骨架（/、/posts、/projects、/about、/auth）  
**文件**: pages/index.tsx, pages/posts.tsx, pages/projects.tsx, pages/about.tsx, pages/auth/ 等; components/Layout.tsx  
**输出**: 各页面无内容但结构正确、导航可用  
**前置**: 0.1、0.2 完成  
- [x] 创建 components/Layout.tsx（Header、Nav、Footer）
- [x] 创建 pages/index.tsx（首页骨架）
- [x] 创建 pages/posts/index.tsx（文章列表页）
- [x] 创建 pages/projects/index.tsx（项目列表页）
- [x] 创建 pages/about.tsx（关于页）
- [x] 创建 pages/auth/login.tsx, pages/auth/register.tsx（认证页面骨架）

### 1.2 实现 MDX 内容解析与页面模板
**描述**: 创建 MDX 解析器、Post/ProjectUpdate 详情页、列表分页  
**文件**: lib/mdx.ts, pages/posts/[slug].tsx, pages/projects/[slug].tsx, components/PostCard.tsx 等  
**输出**: 能读取并渲染 MDX 文件、详情页与列表正常显示  
**前置**: 1.1 完成  
- [x] 实现 getMDXFiles() 与 parseFrontmatter()
- [x] 创建 pages/posts/[slug].tsx（文章详情）
- [x] 创建 pages/projects/[slug].tsx（项目详情）
- [x] 实现分页逻辑（每页 10 条）
- [x] 实现标签/分类筛选

### 1.3 实现登录与注册页面
**描述**: 完成 /auth/login 和 /auth/register 表单与流程  
**文件**: pages/auth/login.tsx, pages/auth/register.tsx, components/AuthForm.tsx  
**输出**: 能注册与登录、成功后跳转工具页或首页  
**前置**: 0.4 完成  
- [x] 创建 AuthForm 组件（邮箱/密码输入）
- [x] 实现登录表单与提交逻辑
- [x] 实现注册表单与验证（邮箱格式、密码强度等）
- [x] 实现成功/错误提示与重定向逻辑

### 1.4 实现路由守卫与受保护页面
**描述**: 创建 ProtectedRoute HOC、实现工具页访问控制  
**文件**: lib/withAuth.tsx, middleware.ts（Vercel Edge Middleware）  
**输出**: 工具页需登录才能访问  
**前置**: 0.4、1.1、1.3 完成  
- [x] 创建 withAuth() 高阶组件
- [x] 创建 middleware.ts（Edge 层检查登录状态）
- [x] 为工具页路由应用守卫

---

## Phase 2：Features (Comments & Image Tools)

### 2.1 实现评论表与 API 接口
**描述**: 创建评论 API 端点（列表、发表、删除）与数据库查询  
**文件**: pages/api/comments.ts, pages/api/comments/[id].ts, lib/db.ts  
**输出**: 能通过 API 获取/发表/删除评论  
**前置**: 0.3 完成  
- [x] 创建 API Route：GET /api/comments?post_slug=... (查询)
- [x] 创建 API Route：POST /api/comments (发表，RLS 自动检查)
- [x] 创建 API Route：DELETE /api/comments/[id] (删除，admin only)
- [ ] 实现服务端频控（Upstash Redis 或简单内存缓存）

### 2.2 实现评论前端组件与交互
**描述**: 创建评论表单、列表、删除按钮  
**文件**: components/CommentForm.tsx, components/CommentList.tsx  
**输出**: 能在文章详情页显示/发表/删除评论  
**前置**: 2.1 完成  
- [x] 创建 CommentForm 组件（可选昵称/邮箱、内容输入、提交）
- [x] 创建 Comment 单条渲染组件
- [x] 创建 CommentList 组件（支持分页/加载更多）
- [x] 在 pages/posts/[slug].tsx 整合评论部分

### 2.3 实现生图工具表与后端代理
**描述**: 创建 image_jobs 表查询、ComfyUI 代理端点、状态轮询  
**文件**: pages/api/images/generate.ts, pages/api/images/[id].ts, lib/comfyui.ts  
**输出**: 能提交生图任务、查询状态、获取结果  
**前置**: 0.3 完成  
- [x] 创建 API Route：POST /api/images/generate (提交生图任务)
  - 校验参数（prompt, size, steps），RLS 检查用户登录
  - 插入 image_jobs（status='queued'）
  - 转发请求到 ComfyUI API（代理密钥）
  - 返回 job_id
- [ ] 创建 API Route：GET /api/images/[id] (查询任务状态)
  - 返回 { status, result_url?, error? }
- [ ] 创建 API Route：GET /api/images (列表，仅本人与 admin)
- [ ] 实现 comfyui.ts 代理层（隐藏密钥、转换参数格式、错误处理）
- [ ] 实现频控（基于用户/IP）

### 2.4 实现生图工具前端页面
**描述**: 创建工具页表单与结果展示、状态反馈、历史记录  
**文件**: pages/tools/image.tsx, components/ImageForm.tsx, components/ImageResult.tsx  
**输出**: 能在工具页提交生图、看到状态与结果  
**前置**: 2.3 完成  
- [x] 创建 ImageForm 组件（提示词、负面词、尺寸、步数选择）
- [x] 创建 ImageResult 组件（显示生成中、完成、失败状态）
- [x] 创建 ImageHistory 组件（列表展示过往任务，仅本人与 admin）
- [ ] 实现状态轮询逻辑（2s 内首次反馈，定时查询直至完成）
- [x] 在 pages/tools/image.tsx 整合上述组件

---

## Phase 3：Polish & Deployment

### 3.1 实现搜索与标签筛选
**描述**: 添加文章搜索框（标题/摘要）、标签页、归档页  
**文件**: pages/search.tsx, pages/tags/[tag].tsx, pages/archive.tsx, lib/search.ts  
**输出**: 能通过搜索/标签查找内容  
**前置**: 1.2 完成  
- [x] 实现静态搜索索引生成（构建时）
- [ ] 创建搜索页面与搜索表单
- [x] 创建标签页面（显示同标签内容）
- [ ] 创建归档页面（按时间/标签组织）

### 3.2 配置 SEO、Sitemap、OG
**描述**: 添加 meta 标签、sitemap.xml、robots.txt、结构化数据  
**文件**: public/sitemap.xml, public/robots.txt, lib/seo.ts, components/SEO.tsx  
**输出**: 搜索引擎友好、社交分享美观  
**前置**: 1.1、1.2 完成  
- [x] 创建 SEO 组件（处理 meta 标签与 og:image）
- [x] 生成 sitemap.xml
- [x] 创建 robots.txt
- [ ] 添加文章详情的 structured data（JSON-LD）

### 3.3 实现深浅色切换与样式完善
**描述**: 添加深浅色主题切换、响应式设计、动画  
**文件**: hooks/useDarkMode.ts, tailwind.config.js, components/* (styles)  
**输出**: 界面美观、响应式、支持深浅色  
**前置**: 1.1 完成  
- [x] 配置 Tailwind Dark Mode（class 策略）
- [x] 实现 useDarkMode 钩子（切换主题、持久化）
- [x] 为所有页面组件添加深浅色适配
- [x] 验证移动端响应式设计
- [ ] 添加平滑过渡与加载动画

### 3.4 完善错误处理与用户反馈
**描述**: 实现全局错误边界、加载状态、空态提示、操作反馈  
**文件**: components/ErrorBoundary.tsx, components/Toast.tsx, lib/feedback.ts  
**输出**: 用户体验完整、错误可恢复  
**前置**: 1.1、2.1、2.4 完成  
- [ ] 创建 ErrorBoundary 组件
- [ ] 创建 Toast 通知组件（成功/错误/加载）
- [ ] 在所有 API 调用中添加错误处理与反馈
- [ ] 为空数据状态添加友好提示

### 3.5 站点配置与自定义
**描述**: 创建 config 文件、支持站点名称/导航/社交等自定义  
**文件**: config/site.ts, pages/api/config.ts  
**输出**: 易于维护的配置中心  
**前置**: 0.4 完成  
- [ ] 创建 config/site.ts（站点名、导航、社交链接等）
- [ ] 在各页面中使用 config 值
- [ ] 可选：实现 Admin 后台编辑配置（超出基础实现范围）

### 3.6 性能优化与监控
**描述**: 图片优化、缓存策略、Vercel Analytics、错误日志  
**文件**: next.config.js, lib/analytics.ts  
**输出**: 页面性能达标、可观察  
**前置**: 1.1、1.2 完成  
- [ ] 配置 Next.js Image 优化
- [ ] 设置 ISR revalidate 时间（建议 3600s）
- [ ] 集成 Vercel Analytics 或 Plausible
- [ ] 配置错误日志上报（可选：Sentry）

### 3.7 上线前检查与部署
**描述**: 测试所有功能、Vercel 部署、域名绑定、最终验证  
**文件**: 项目配置、GitHub 推送  
**输出**: 网站在 www.leik1000.xyz 上线  
**前置**: 3.1 - 3.6 全部完成  
- [ ] 本地运行完整测试（所有页面、认证、评论、生图）
- [ ] 推送到 GitHub
- [ ] Vercel 导入项目，填写环境变量
- [ ] 部署完成，访问 Vercel 预览域名验证
- [ ] 在域名 DNS 添加 CNAME，绑定自定义域 www.leik1000.xyz
- [ ] 验证 HTTPS 证书生效
- [ ] 最终功能巡检（对应规范的验收标准）
- [x] 完成 README.md 与文档编写

---

## 依赖关系图
```
0.1 (Setup)
 ├─ 0.2 (Dir)
 ├─ 0.3 (Supabase)
 ├─ 0.4 (Auth Client) ← 0.3
 └─ 0.5 (Env) ← 0.3, 0.4

1.1 (Pages) ← 0.1, 0.2
 ├─ 1.2 (MDX) ← 1.1
 ├─ 1.3 (Auth Pages) ← 0.4, 1.1
 └─ 1.4 (Protected Routes) ← 0.4, 1.1, 1.3

2.1 (Comments API) ← 0.3
 ├─ 2.2 (Comments UI) ← 2.1, 1.2
 ├─ 2.3 (Image API) ← 0.3
 └─ 2.4 (Image UI) ← 2.3, 1.4

3.1 (Search/Tags) ← 1.2
3.2 (SEO) ← 1.1, 1.2
3.3 (Theme) ← 1.1
3.4 (UX Polish) ← 1.1, 2.1, 2.4
3.5 (Config) ← 0.4
3.6 (Perf) ← 1.1, 1.2
3.7 (Deploy) ← 3.1~3.6 all
```

---

## 标记说明
- `[P]` 并行可执行
- `[ ]` 未完成
- `[X]` 已完成

