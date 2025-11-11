# Agent Context（实现用技术上下文）

## 目标
- 零后端自管：Vercel 托管，Next.js（SSG/ISR + API Routes/Edge）
- 工具页（生图）需登录访问；用户可自助注册
- 评论匿名可发，admin 可软删

## 技术堆栈
- Next.js + Vercel（前端与 API）
- Supabase：Auth / Postgres（RLS）/ Storage
- 代理外部：ComfyUI 公网 API（使用环境变量 URL/KEY）

## 关键约束
- 不引入自建服务器或长期驻留进程
- RLS 默认拒绝，精准授权
- 频控在 Edge/Serverless 层实现

## 产物对照
- 规范：`specs/1-personal-blog/spec.md`
- 研究：`specs/1-personal-blog/plan/research.md`
- 数据：`specs/1-personal-blog/plan/data-model.md`
- 合同：`specs/1-personal-blog/plan/contracts/openapi.yaml`
- 快速开始：`specs/1-personal-blog/plan/quickstart.md`


