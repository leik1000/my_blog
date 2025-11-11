# 个人博客网站

一个现代化的个人博客平台，支持项目展示、文章发布、评论系统和 AI 生图工具。

## 🎯 功能特性

- 📝 **博客与项目管理** - 通过 MDX/Markdown 发布文章和项目进展
- 💬 **评论系统** - 访客可以直接评论，博主可删除（无需审核）
- 🖼️ **AI 生图工具** - 集成 ComfyUI，登录后可使用生图功能
- 🌙 **深浅色主题** - 自动适配系统主题，支持手动切换
- 📱 **响应式设计** - 完全适配移动端与桌面端
- 🔍 **SEO 优化** - 自动生成 sitemap、robots.txt、结构化数据
- ⚡ **性能优化** - ISR 增量静态再生成、图片优化

## 🛠️ 技术栈

- **前端框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **认证与数据**: [Supabase](https://supabase.com/) (Auth + PostgreSQL + Storage)
- **内容格式**: MDX / Markdown
- **部署**: [Vercel](https://vercel.com/)
- **语言**: TypeScript + React

## 📋 前置要求

- Node.js 18+
- npm 或 yarn
- Supabase 账户
- GitHub 账户（用于部署）
- 自定义域名（可选）

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <你的仓库>
cd my_blog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 Supabase

参考 `SUPABASE_SETUP.md` 完成以下步骤：
- 创建 Supabase 项目
- 执行建表 SQL 脚本
- 创建 Storage Bucket
- 获取 API 凭证

### 4. 配置环境变量

创建 `.env.local` 文件：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE=your-service-role

# 网站配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=My Blog

# ComfyUI（后期填写）
COMFYUI_API_URL=
COMFYUI_API_KEY=

# 配置
IMAGE_RETENTION_DAYS=30
```

### 5. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📝 添加内容

### 添加文章

在 `content/posts/` 目录创建 `.mdx` 文件：

```markdown
---
title: 我的第一篇文章
summary: 这是一个简短的摘要
date: 2025-01-01
tags:
  - Next.js
  - 博客
cover: https://example.com/image.jpg
---

# 文章标题

文章内容...
```

### 添加项目

在 `content/projects/` 目录创建 `.mdx` 文件，格式同上，可添加 `pinned: true` 置顶。

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

## 🌍 部署到 Vercel

### 1. 推送到 GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. 连接 Vercel

- 访问 [vercel.com](https://vercel.com)
- 点击"Import Project"
- 选择你的 GitHub 仓库
- 填写环境变量（与 `.env.local` 相同）
- 点击"Deploy"

### 3. 绑定自定义域名

- 在 Vercel 项目 Settings → Domains
- 点击"Add Domain"
- 输入 `www.leik1000.xyz`
- 按指示在 DNS 提供商添加 CNAME 记录

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

### Q: 我如何修改站点名称？
**A**: 修改 `lib/config.ts` 中的 `name` 字段。

### Q: 如何添加新的导航菜单项？
**A**: 修改 `lib/config.ts` 中的 `nav` 数组。

### Q: 评论为什么显示不出来？
**A**: 
1. 检查 Supabase 中 `comments` 表是否创建
2. 检查浏览器开发者工具的 Network 标签查看 API 调用
3. 确保 RLS 策略配置正确

### Q: 生图工具为什么 401？
**A**: 检查是否已登录，如未登录会被重定向到登录页。

## 📝 许可证

MIT License

## 💬 联系方式

有任何问题或建议，欢迎通过以下方式联系：
- 在博客下方评论
- 发送邮件到 contact@example.com

---

**最后更新**: 2025-01-01

祝你使用愉快！🚀
