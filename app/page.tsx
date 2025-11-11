import { PostCard } from '@/components/PostCard';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="text-center max-w-4xl mx-auto py-20">
          {/* 头像 */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl shadow-blue-500/20 hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-5xl">
                👨‍💻
              </div>
            </div>
          </div>

          {/* 标题与简介 */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            欢迎来到我的博客
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 animate-fade-in-delay">
            分享技术见解 · 记录项目经验 · 探索创新可能
          </p>

          {/* 社交链接 */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <a
              href="https://github.com/leik1000/my_blog"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              title="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              title="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a
              href="mailto:409239349@qq.com"
              className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              title="Email"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>

          {/* CTA 按钮 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/posts"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              查看文章
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-full font-medium hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:scale-105"
            >
              浏览项目
            </Link>
          </div>
        </div>

        {/* 向下滚动提示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </section>

      {/* 内容区域 */}
      <div className="grid gap-16 py-16">
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">最近文章</h2>
            <Link href="/posts" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              查看全部 →
            </Link>
          </div>
          <div className="grid gap-6">
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
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">工具箱</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/tools/image" className="group">
              <div className="p-8 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">AI 生图工具</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  基于 ComfyUI 的快速生图服务，支持自定义提示词和参数
                </p>
                <div className="mt-4 text-blue-600 font-medium group-hover:translate-x-2 transition-transform inline-block">
                  开始使用 →
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
