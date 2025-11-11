# ✨ 个人博客网站 - My Blog

> 一个使用 Next.js 14、Supabase、Tailwind CSS 构建的现代化个人博客平台
> 
> 支持文章发布、项目展示、实时评论、用户认证和 AI 生图工具

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

---

## 🎯 主要功能

| 功能 | 说明 | 状态 |
|------|------|------|
| 📝 **文章与项目管理** | 通过 MDX/Markdown 发布内容，支持标签分类 | ✅ |
| 💬 **实时评论系统** | 访客可直接评论（无需审核），博主可管理 | ✅ |
| 👤 **用户认证** | 基于 Supabase Auth，支持注册/登录/登出 | ✅ |
| 🖼️ **AI 生图工具** | 集成 ComfyUI，登录后可生成 AI 图片 | ✅ |
| 🌙 **深浅色主题** | 自动适配系统主题，支持手动切换 | ✅ |
| 📱 **响应式设计** | 完全适配移动端、平板、桌面端 | ✅ |
| 🔍 **SEO 优化** | 自动生成 sitemap、robots.txt、OG 标签 | ✅ |
| ⚡ **性能优化** | ISR 增量静态再生成、图片优化、CDN 加速 | ✅ |

## 🛠️ 技术栈

### 前端
- **框架**: [Next.js 14](https://nextjs.org/) - React 全栈框架，支持 App Router
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/) - 实用优先的 CSS 框架
- **语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- **内容**: [MDX](https://mdxjs.com/) - 支持 Markdown + React 组件

### 后端服务
- **认证**: [Supabase Auth](https://supabase.com/docs/guides/auth) - 支持邮箱/密码认证
- **数据库**: [PostgreSQL](https://www.postgresql.org/) via Supabase
- **存储**: [Supabase Storage](https://supabase.com/docs/guides/storage) - 用于图片存储
- **RLS**: 行级安全策略，确保数据隐私

### 部署与托管
- **前端部署**: [Vercel](https://vercel.com/) - Next.js 官方推荐的部署平台
- **域名管理**: 支持自定义域名
- **CDN**: Vercel Edge Network 全球加速

### AI 集成
- **生图工具**: [ComfyUI](https://github.com/comfyanonymous/ComfyUI) - 开源 AI 图片生成
- **API 代理**: Next.js API Routes 作为中间层

## 📋 前置要求

| 要求 | 版本 | 说明 |
|------|------|------|
| Node.js | 18+ | JavaScript 运行时 |
| npm/yarn | 最新 | 包管理器 |
| Supabase | - | 免费账户即可 |
| GitHub | - | 用于仓库和部署 |
| 自定义域名 | - | 可选，用于绑定到 Vercel |

## 🚀 快速开始

### Step 1: 克隆项目

```bash
git clone https://github.com/YOUR_USERNAME/my_blog.git
cd my_blog
```

### Step 2: 安装依赖

```bash
npm install
# 或
yarn install
```

### Step 3: 配置 Supabase

详细步骤请参考 [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)：

1. 在 [supabase.com](https://supabase.com) 创建项目
2. 在 SQL Editor 执行提供的建表脚本
3. 创建 `images` Storage Bucket
4. 在 Settings → API 获取凭证

### Step 4: 配置环境变量

创建 `.env.local` 文件（参考 `.env.example`）：

```bash
# ━━━━ Supabase ━━━━
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE=your-service-role-key

# ━━━━ 网站配置 ━━━━
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=My Blog

# ━━━━ AI 生图工具（可选，后期配置）━━━━
NEXT_PUBLIC_COMFYUI_URL=http://your-comfyui-server:8188
COMFYUI_API_KEY=your-api-key

# ━━━━ 图片存储策略 ━━━━
IMAGE_RETENTION_DAYS=30
```

### Step 5: 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 👉 完成！

## 📝 内容管理

### 添加文章

在 `content/posts/` 目录创建 `.mdx` 文件：

```markdown
---
title: 我的第一篇 Next.js 文章
summary: 分享一些 Next.js 开发经验和最佳实践
date: 2025-01-15
tags:
  - Next.js
  - Web开发
  - TypeScript
cover: https://example.com/blog-cover.jpg
---

# 我的第一篇文章

## 介绍

这是 markdown 内容...

## 代码示例

\`\`\`typescript
// Next.js 示例代码
export default function Home() {
  return <h1>Hello World</h1>;
}
\`\`\`

## 更多内容

使用标准 Markdown 语法即可。
```

### 添加项目

在 `content/projects/` 目录创建 `.mdx` 文件，格式同上，额外支持 `pinned` 字段：

```markdown
---
title: ComfyUI 集成项目
summary: 将 ComfyUI 集成到博客中，实现 AI 生图功能
date: 2025-01-10
tags:
  - AI
  - ComfyUI
  - 项目
pinned: true
cover: https://example.com/project-cover.jpg
---

项目内容...
```

> ✨ **提示**: 文章和项目使用相同的格式，区别只在于存储位置
> - 文章: `content/posts/your-article.mdx`
> - 项目: `content/projects/your-project.mdx`

## 🗂️ 项目结构

```
my_blog/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx           # 首页
│   ├── posts/             # 文章相关页面
│   ├── projects/          # 项目相关页面
│   ├── tools/             # 工具页面
│   ├── auth/              # 认证页面
│   ├── api/               # API 路由
│   └── sitemap.ts         # SEO 地图
├── components/            # React 组件
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CommentForm.tsx
│   └── CommentList.tsx
├── lib/                   # 工具函数
│   ├── supabase.ts        # Supabase 客户端
│   ├── mdx.ts             # MDX 解析
│   └── config.ts          # 站点配置
├── content/               # 内容文件
│   ├── posts/             # 文章
│   └── projects/          # 项目
├── public/                # 静态文件
└── middleware.ts          # 路由中间件
```

## 🔐 用户认证

### 注册

访问 `/auth/register`，填写邮箱和密码注册新账户。

### 登录

访问 `/auth/login`，用注册的邮箱和密码登录。

登录后可访问工具页面。

### 管理员权限

要成为管理员（可删除评论），需要在 Supabase 中设置用户角色为 `admin`。参考 `SUPABASE_SETUP.md` 的"第四步"。

## 🛠️ 工具页面

### 生图工具 (`/tools/image`)

需要登录才能使用。功能包括：
- 输入提示词（1-500 字符）
- 选择图片尺寸（512x512、768x768、1024x1024）
- 调整生成步数（10-50）
- 查看生成历史

**后端集成**:
你需要提供 ComfyUI API，API Route 会代理请求。

## 📊 评论系统

### 发表评论

- 访问文章详情页
- 填写昵称（可选）、邮箱（可选）、评论内容（必填）
- 点击"发表评论"

### 删除评论

管理员可在文章详情页删除评论（需要实现前端删除按钮和权限检查）。

## 🌍 部署指南

### 方式 1: 通过 Vercel（推荐）⭐

#### Step 1: 推送到 GitHub

```bash
git add .
git commit -m "feat: Initial commit - Personal blog with Next.js & Supabase"
git branch -M main
git push -u origin main
```

#### Step 2: 在 Vercel 中导入项目

1. 访问 [vercel.com](https://vercel.com)
2. 登录或创建账户
3. 点击 **"Add New..."** → **"Project"**
4. 选择 **"Import Git Repository"**
5. 搜索并选择 `my_blog` 仓库
6. 点击 **"Import"**

#### Step 3: 配置环境变量

在 Vercel 的 **Environment Variables** 中添加：

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=My Blog
```

> 其他可选环境变量见 Step 4 配置文件

#### Step 4: 部署

点击 **"Deploy"** 按钮，Vercel 会自动构建和部署

部署完成后，你会获得一个 `*.vercel.app` 的临时域名用于测试

### 方式 2: 绑定自定义域名 🌐

#### 在 Vercel 中添加域名

1. 打开你的 Vercel 项目
2. 进入 **Settings** → **Domains**
3. 点击 **"Add Domain"**
4. 输入你的域名 `www.leik1000.xyz`
5. Vercel 会显示需要的 DNS 配置

#### 修改 DNS 记录（以阿里云为例）

1. 登录你的域名服务商管理后台（如阿里云、腾讯云等）
2. 找到 **DNS 解析** 或 **域名解析** 菜单
3. 添加/修改 DNS 记录：

| 记录类型 | 主机名 | 记录值 | TTL |
|---------|--------|--------|-----|
| CNAME | www | cname.vercel-dns.com | 600 |
| CNAME | @ | cname.vercel-dns.com | 600 |

> ⚠️ **注意**: 具体的 CNAME 值请以 Vercel 界面显示的为准

4. 点击 **"确认"** 保存记录
5. DNS 生效需要 24-48 小时（通常更快）
6. Vercel 自动验证后，你就可以通过自定义域名访问博客了

### 方式 3: 使用 Vercel CLI（可选）

```bash
npm i -g vercel
vercel
```

按照提示完成部署配置

## 📖 内容编写指南

### Markdown 语法

所有标准 Markdown 语法都支持：

```markdown
# 一级标题
## 二级标题
**加粗** *斜体* ~~删除线~~

- 列表项
- 列表项

1. 有序项
2. 有序项

> 引用

`行内代码`

\`\`\`javascript
// 代码块
const hello = () => console.log('Hello');
\`\`\`

[链接](https://example.com)
![图片](https://example.com/image.jpg)
```

### Front Matter 字段

- `title` (必填) - 文章标题
- `summary` (必填) - 文章摘要
- `date` (必填) - 发布日期 (ISO 8601 格式)
- `tags` (必填) - 标签数组
- `cover` (可选) - 封面图片 URL
- `pinned` (可选) - 是否置顶（仅项目）

## ⚙️ 配置选项

在 `lib/config.ts` 中修改站点配置：

```typescript
export const siteConfig = {
  name: 'My Blog',              // 站点名称
  url: 'https://example.com',   // 站点 URL
  description: '个人博客',       // 站点描述
  author: '博主',                // 作者名称
  socials: {
    github: '',                  // GitHub 链接
    twitter: '',                 // Twitter 链接
  },
};
```

## 🐛 常见问题

### Q1: 注册后无法登录？
**A**: 
- 确保你的 Supabase 邮箱验证已禁用（或已验证邮箱）
- 检查 `.env.local` 中的 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 是否正确
- 清除浏览器 localStorage 后重试

### Q2: 评论显示不出来？
**A**: 
1. 检查 Supabase 中 `comments` 表是否已创建
2. 打开浏览器开发者工具（F12）→ Network 标签，检查 API 调用
3. 确保 RLS 策略配置正确（参考 `SUPABASE_SETUP.md`）
4. 检查是否有 CORS 错误

### Q3: 生图工具为什么显示 401？
**A**: 
- 检查是否已登录（未登录会自动重定向到登录页）
- 确保 Supabase 认证正确
- 检查浏览器 localStorage 中是否有有效的 session

### Q4: 如何修改站点名称和描述？
**A**: 编辑 `lib/config.ts` 文件中的 `siteConfig` 对象

### Q5: 如何添加新的页面或菜单项？
**A**: 
1. 在 `app/` 目录创建新文件夹（如 `app/my-page/page.tsx`）
2. 如需在菜单中显示，修改 `components/Header.tsx` 的导航链接

### Q6: 部署后样式异常？
**A**: 
- 确保 `tailwind.config.ts` 配置正确
- 清除 Vercel 缓存：项目 Settings → Deployments → 点击三点菜单 → Redeploy
- 等待 5-10 分钟让 CDN 更新缓存

### Q7: 图片无法上传到 Storage？
**A**:
- 确保 `images` bucket 已创建
- 检查 Storage RLS 策略是否允许写入
- 确保登录用户的 ID 正确

## 📚 更多资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [Supabase 官方文档](https://supabase.com/docs)
- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- [MDX 文档](https://mdxjs.com/)
- [Vercel 部署指南](https://vercel.com/docs)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 许可证

本项目采用 MIT License 开源。详见 [LICENSE](LICENSE) 文件。

## 👨‍💻 作者

- **个人博客**: [www.leik1000.xyz](https://www.leik1000.xyz)
- **GitHub**: [@your-username](https://github.com/your-username)

## 🌟 如果有帮助，请给个 Star！

你的 Star ⭐ 能帮助我们改进这个项目。谢谢！

---

**最后更新**: 2025-11-11

祝你使用愉快！如有任何问题，欢迎在博客下方评论或提交 Issue。🚀
