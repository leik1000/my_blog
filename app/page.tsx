import { PostCard } from '@/components/PostCard';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">欢迎来到我的博客</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          分享最新的项目进展与技术文章
        </p>
      </section>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">最近文章</h2>
          <div className="grid gap-4">
            <PostCard 
              title="示例文章" 
              summary="这是一篇示例文章的摘要"
              slug="sample-post"
              date="2025-01-01"
              tags={['示例']}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">工具</h2>
          <div className="grid gap-4">
            <div className="p-4 border rounded-lg dark:border-slate-700">
              <h3 className="font-bold mb-2">AI 生图工具</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                基于 ComfyUI 的快速生图服务（需登录）
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
