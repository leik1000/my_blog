# 🚀 部署指南 - 详细步骤

本文档提供了从 GitHub 推送到最终在 Vercel 部署的完整步骤。

---

## 📋 部署清单

- [ ] **Step 1**: 创建 GitHub 仓库
- [ ] **Step 2**: 推送代码到 GitHub
- [ ] **Step 3**: 在 Vercel 中导入项目
- [ ] **Step 4**: 配置环境变量
- [ ] **Step 5**: 完成部署
- [ ] **Step 6**: 验证部署成功
- [ ] **Step 7**: 配置自定义域名
- [ ] **Step 8**: 修改 DNS 记录

---

## 🔧 详细步骤

### Step 1: 创建 GitHub 仓库

#### 方式 A: 使用 GitHub 网页界面（推荐）

1. 访问 [github.com/new](https://github.com/new)
2. 填写仓库信息：
   - **Repository name**: `my_blog`
   - **Description**: `Personal blog with Next.js, Supabase & Tailwind CSS`
   - **Public** 或 **Private**: 选择 Public 便于展示
   - **Initialize this repository with**:
     - ❌ 不勾选 "Add a README file"（我们已有）
     - ❌ 不勾选 ".gitignore"（我们已有）
     - ❌ 不勾选 "License"（可选）
3. 点击 **"Create repository"**

创建完成后，GitHub 会显示一个空仓库的初始化页面。

#### 方式 B: 使用 Git 命令

```bash
gh repo create my_blog --public --source=. --remote=origin --push
```

> 需要先安装 [GitHub CLI](https://cli.github.com/)

---

### Step 2: 推送代码到 GitHub

#### 2.1 检查 Git 配置

```bash
cd D:\weixin_app\my_blog
git status
```

输出应该显示 `On branch 1-personal-blog` 和之前的提交。

#### 2.2 配置远程仓库

将以下命令中的 `YOUR_USERNAME` 替换为你的 GitHub 用户名，然后执行：

```bash
git remote add origin https://github.com/YOUR_USERNAME/my_blog.git
git branch -M main
git push -u origin main
```

> 如果出现 "remote origin already exists" 错误，先执行：
> ```bash
> git remote remove origin
> ```

#### 2.3 验证推送

访问 `https://github.com/YOUR_USERNAME/my_blog` 检查代码是否成功上传。

> 📝 **提示**: 你应该看到所有的文件都在仓库中（app/, components/, content/ 等）

---

### Step 3: 在 Vercel 中导入项目

#### 3.1 访问 Vercel

1. 打开 [vercel.com](https://vercel.com)
2. 使用 GitHub 账户登录
   - 点击 **"Sign Up"** → **"Continue with GitHub"**
   - 授予 GitHub 权限
3. 授权 Vercel 访问你的仓库

#### 3.2 创建新项目

1. 点击 **"Add New..."** → **"Project"**
2. 在搜索框中输入 `my_blog`
3. 选择你刚创建的 `your-username/my_blog` 仓库
4. 点击 **"Import"**

#### 3.3 配置项目设置

在导入页面，你会看到以下选项：

- **Project Name**: 保持默认 `my_blog` 或修改为你喜欢的名称
- **Framework Preset**: 自动检测为 **Next.js** ✅
- **Root Directory**: 保持默认 `.` ✅
- **Environment Variables**: 下一步配置

---

### Step 4: 配置环境变量

#### 4.1 在导入页面添加环境变量

在 **"Environment Variables"** 部分，添加以下变量：

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://my-blog.vercel.app
NEXT_PUBLIC_SITE_NAME=My Blog
```

> 如果你已有自定义域名，用域名替换 `https://my-blog.vercel.app`

**如何获取这些值？**

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 进入 **Settings** → **API**
4. 复制：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE`

#### 4.2 后续修改环境变量

如果部署后需要修改环境变量：

1. 打开你的 Vercel 项目
2. 进入 **Settings** → **Environment Variables**
3. 修改或添加新的变量
4. 点击 **"Save"**
5. 重新部署（进入 **Deployments** → 点击最新部署 → **Redeploy**）

---

### Step 5: 完成部署

1. 检查所有配置无误后，点击 **"Deploy"** 按钮
2. Vercel 会开始构建你的项目
3. 等待构建完成（通常 1-3 分钟）
4. 看到 ✅ "Congratulations! Your site is live" 表示部署成功

---

### Step 6: 验证部署成功

#### 6.1 访问 Vercel 提供的域名

部署完成后，你会获得一个临时域名，如：`my-blog.vercel.app`

1. 访问这个域名
2. 验证以下功能：
   - ✅ 首页正确加载
   - ✅ 文章页面可访问
   - ✅ 项目页面可访问
   - ✅ 登录/注册功能正常
   - ✅ 评论系统可用
   - ✅ 主题切换正常

#### 6.2 检查构建日志

如果页面显示错误，查看构建日志：

1. 进入 **Deployments** 标签
2. 点击最新的部署
3. 查看 **Logs** 标签查看错误信息
4. 修复问题后重新部署

---

### Step 7: 配置自定义域名

#### 7.1 在 Vercel 中添加域名

1. 打开你的 Vercel 项目
2. 进入 **Settings** → **Domains**
3. 点击 **"Add Domain"**
4. 输入你的域名：`www.leik1000.xyz`
5. 点击 **"Add"**
6. Vercel 会显示需要的 DNS 配置信息

Vercel 会给你两个选项：
- **Nameservers** - 更改整个域的 nameserver
- **CNAME** - 添加 CNAME 记录（更推荐）

---

### Step 8: 修改 DNS 记录

#### 8.1 登录域名服务商

以阿里云为例（其他服务商步骤类似）：

1. 登录 [阿里云控制台](https://www.aliyun.com/)
2. 进入 **云产品** → **域名**
3. 找到你的域名 `leik1000.xyz`
4. 点击 **"管理"** 或 **"DNS 解析"**

#### 8.2 添加 DNS 记录

在 DNS 解析页面，添加/修改以下记录：

| 记录类型 | 主机名 | 记录值 | TTL |
|---------|--------|--------|-----|
| CNAME | www | cname.vercel-dns.com | 600 |
| A | @ | 76.76.19.19 | 600 |
| A | @ | 76.76.20.19 | 600 |
| A | @ | 76.76.21.19 | 600 |

> **重要**: 具体的 CNAME 值请以 Vercel 界面显示的为准！

#### 8.3 保存并等待 DNS 生效

1. 点击 **"确认"** 保存所有记录
2. DNS 生效需要 24-48 小时（通常 30 分钟内）
3. 可以使用 [DNS 检测工具](https://www.nslookup.io/) 检查是否生效

```bash
nslookup www.leik1000.xyz
```

#### 8.4 验证域名配置

DNS 生效后：

1. 回到 Vercel 项目的 **Settings** → **Domains**
2. 检查你的域名状态，应该显示 ✅ "Valid Configuration"
3. 访问 `https://www.leik1000.xyz` 验证博客是否正确加载

> 📝 **提示**: 第一次访问可能较慢，因为 SSL 证书正在生成

---

## ⚡ 快速参考命令

```bash
# 克隆（他人想要本地运行你的项目时）
git clone https://github.com/YOUR_USERNAME/my_blog.git
cd my_blog

# 初始化（首次部署时）
git remote add origin https://github.com/YOUR_USERNAME/my_blog.git
git branch -M main
git push -u origin main

# 后续更新代码后推送
git add .
git commit -m "your commit message"
git push
```

---

## 🐛 常见问题

### Q: 部署失败，显示 "Build failed"？
**A**: 
1. 检查 Node.js 版本兼容性
2. 检查环境变量是否正确
3. 查看详细的构建日志
4. 确保 `package.json` 中的依赖都能安装

### Q: 部署后访问显示 404？
**A**: 
1. 检查 Vercel 项目是否绑定了正确的域名
2. 等待 DNS 生效
3. 清除浏览器缓存
4. 检查网页开发者工具中是否有错误

### Q: 环境变量没有生效？
**A**: 
1. 重新部署一次
2. 清除 Vercel 构建缓存：Settings → Deployments → 点击三点 → Redeploy
3. 等待 5-10 分钟让新环境生效

### Q: DNS 一直没有生效？
**A**: 
1. 检查 DNS 记录是否正确添加
2. 使用 `nslookup www.leik1000.xyz` 检查
3. 尝试清除本地 DNS 缓存：`ipconfig /flushdns`（Windows）
4. 等待 24 小时后再尝试

---

## ✅ 最后检查清单

部署完成后，请确保：

- [ ] 域名可以正确访问
- [ ] HTTPS 证书正确加载（地址栏有锁🔒）
- [ ] 所有页面可以正常加载
- [ ] 注册/登录功能正常
- [ ] 评论系统正常
- [ ] 生图工具可以访问（登录后）
- [ ] 响应式设计在手机上正常显示
- [ ] 深浅色主题正常切换
- [ ] SEO 标签正确（检查页面源代码）

---

## 🎉 恭喜！

你已成功部署了个人博客到 Vercel！

现在你可以：
1. 添加更多文章和项目
2. 配置 ComfyUI 并启用生图工具
3. 邀请朋友访问你的博客
4. 不断改进和优化你的网站

---

**需要帮助？**
- 查看 [README.md](./README.md) 中的常见问题
- 参考 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 进行 Supabase 配置
- 访问 [Vercel 官方文档](https://vercel.com/docs)

祝部署顺利！🚀

