# Phase 0 · Research（技术背景与决策）

## 技术选型（已拍板）
- 托管与渲染：Vercel（Next.js，SSG/ISR + Serverless/Edge）
- 内容：仓库内 MDX/Markdown（content/posts, content/projects）
- 认证与数据：Supabase（Auth + Postgres + Storage，启用 RLS）
- 工具页（生图）：Vercel API Route/Edge 代理 → ComfyUI 公网 API
- 图片存储：Supabase Storage（默认保留 30 天，可调）
- 域名：`www.leik1000.xyz` 绑定 Vercel

## 决策与理由
1) Next.js + Vercel
- Decision: 零后端自管，自动化部署，支持 ISR，冷启动成本低
- Rationale: 维护成本最低，生态完善，静态内容 + 少量 API 足够
- Alternatives: Nuxt/Netlify，静态站点生成器（Hugo）+ 外置函数

2) Supabase（Auth/DB/Storage）
- Decision: 一体化托管（Auth/RLS/对象存储）
- Rationale: 评论与任务历史需要结构化与权限；免费层覆盖
- Alternatives: Vercel Postgres + Clerk/Auth0（集成更复杂），PlanetScale（无 RLS）

3) 工具页代理 ComfyUI
- Decision: 由 Vercel 函数进行安全代理与频控
- Rationale: 隐藏密钥，统一 CORS 与限流策略，前端不暴露内部接口
- Alternatives: 前端直连（不安全），自建中间层（违背零运维目标）

4) 评论“发即显”、博主可删（软删除）
- Decision: 匿名/昵称直发，admin 可删（deleted=true）
- Rationale: 简洁流畅；RLS + 软删除便于审计
- Alternatives: 审核流（加重维护复杂度）

5) 保留期与历史
- Decision: 图片存储默认 30 天；任务历史仅本人与 admin 可见
- Rationale: 控制成本，符合轻量展示诉求
- Alternatives: 永久保留（成本高），纯前端不留存（用户体验差）

## 集成要点与最佳实践
- Supabase
  - 启用 RLS，所有表默认拒绝，按场景精确授权
  - 使用 Service Role 仅在服务端操作（不可暴露到前端）
  - Storage 按用户/日期分桶或前缀，便于清理
- Vercel
  - 尽量用 Edge Middleware 做轻量频控（基于 IP + 用户）
  - 对计算较重的任务使用 Serverless 函数，避免 Edge 超时
  - ISR 适度设置 revalidate，避免频繁重建
- ComfyUI
  - 统一定义尺寸与步数范围；出现长耗时时优先给“队列中/处理中”反馈
  - 网络失败/超时给可恢复提示，避免重试风暴

## 未知与占位
- ComfyUI 具体 API 形态与鉴权头（使用占位：COMFYUI_API_URL/KEY）
- 频控阈值（初始建议：每用户/每 IP 5 次/分钟）

结论：无阻断性不确定，进入 Phase 1 设计与合同输出。 


