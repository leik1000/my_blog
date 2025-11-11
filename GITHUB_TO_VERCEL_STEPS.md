# 📚 从 GitHub 到 Vercel 部署 - 快速步骤

这是一份简明的部署清单。详细步骤请参考 [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)。

---

## 🚀 5 分钟快速部署

### 第 1 步：创建 GitHub 仓库（2 分钟）

1. 访问 [github.com/new](https://github.com/new)
2. **Repository name**: `my_blog`
3. **Description**: `Personal blog with Next.js, Supabase & Tailwind CSS`
4. **Public** 
5. 点击 **"Create repository"**

### 第 2 步：推送代码到 GitHub（1 分钟）

将以下命令中的 `YOUR_USERNAME` 替换为你的 GitHub 用户名：

```bash
cd D:\weixin_app\my_blog

git remote add origin https://github.com/YOUR_USERNAME/my_blog.git
git branch -M main
git push -u origin main
```

然后访问 `https://github.com/YOUR_USERNAME/my_blog` 验证代码已上传。

### 第 3 步：在 Vercel 中部署（2 分钟）

1. 访问 [vercel.com](https://vercel.com)
2. 用 GitHub 账户登录
3. 点击 **"Add New..."** → **"Project"**
4. 搜索并选择 `my_blog` 仓库
5. 点击 **"Import"**

### 第 4 步：配置环境变量（关键步骤）

**获取 Supabase 凭证：**

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 进入 **Settings** → **API**
4. 复制三个值：
   - **Project URL** 
   - **anon public** 
   - **service_role secret**

**在 Vercel 中添加环境变量：**

点击 **"Environment Variables"** 并添加：

| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | https://your-project-id.supabase.co |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 你的 anon public 值 |
| `SUPABASE_SERVICE_ROLE` | 你的 service_role secret 值 |
| `NEXT_PUBLIC_SITE_URL` | https://my-blog.vercel.app（或你的域名） |
| `NEXT_PUBLIC_SITE_NAME` | My Blog |

### 第 5 步：完成部署

1. 点击 **"Deploy"**
2. 等待构建完成（1-3 分钟）
3. 看到 ✅ "Congratulations! Your site is live"
4. 访问 `my-blog.vercel.app` 验证

---

## 🌐 绑定自定义域名（可选）

### 步骤 1：在 Vercel 中添加域名

1. 打开你的 Vercel 项目
2. **Settings** → **Domains**
3. 点击 **"Add Domain"**
4. 输入 `www.leik1000.xyz`
5. Vercel 会显示 DNS 配置信息

### 步骤 2：修改 DNS 记录

登录你的域名服务商（如阿里云），添加这条记录：

| 记录类型 | 主机名 | 记录值 | TTL |
|---------|--------|--------|-----|
| CNAME | www | cname.vercel-dns.com | 600 |

> ⚠️ **重要**: 具体的 CNAME 值请以 Vercel 显示的为准！

### 步骤 3：等待生效

DNS 生效需要 24-48 小时（通常更快）。生效后：
- 访问 `https://www.leik1000.xyz`
- 地址栏显示 🔒（HTTPS 证书已自动配置）

---

## ✅ 验证检查清单

部署完成后检查：

- [ ] 访问 www.leik1000.xyz 正常加载
- [ ] 首页显示正确
- [ ] 文章页面可访问
- [ ] 登录/注册功能正常
- [ ] 评论系统可用
- [ ] HTTPS 证书正确（🔒 锁）

---

## 🔄 后续更新

当你修改代码或添加文章后：

```bash
# 在本地修改文件，然后：
git add .
git commit -m "Add new article or fix"
git push
```

Vercel 会自动检测到变化并重新部署（通常 1-2 分钟）。

---

## 🐛 遇到问题？

### 部署失败
- 检查 Supabase 环境变量是否正确
- 查看 Vercel 的 **Deployments** → 最新部署 → **Logs**

### 访问 404
- 检查 DNS 是否生效：`nslookup www.leik1000.xyz`
- 清除浏览器缓存
- 等待 Vercel SSL 证书生成

### 功能不正常
- 清除浏览器 localStorage
- 打开开发者工具（F12）检查错误
- 查看 Vercel 构建日志

详细故障排除见 [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)。

---

## 📞 需要帮助？

- 📖 [部署指南（详细）](./DEPLOYMENT_GUIDE.md)
- 📖 [Supabase 配置指南](./SUPABASE_SETUP.md)
- 📖 [项目 README](./README.md)
- 🔗 [Vercel 官方文档](https://vercel.com/docs)

---

🎉 **祝部署顺利！**

一旦部署完成，你就有了一个完全可工作的个人博客网站，支持：
- 📝 发布文章和项目
- 💬 实时评论
- 👤 用户认证
- 🖼️ AI 生图工具（配置 ComfyUI 后）

现在你可以开始创建内容了！添加你的第一篇文章：`content/posts/your-first-post.mdx`

