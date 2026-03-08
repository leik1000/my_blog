import { getAllPosts } from '@/lib/mdx';
import { PostCard } from '@/components/PostCard';
import Link from 'next/link';

export default async function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="flex-1 w-full bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Premium Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 dark:opacity-70 animate-fade-in" style={{ backgroundImage: "url('/hero-bg.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-slate-50/50 to-slate-50 dark:from-slate-950/10 dark:via-slate-950/80 dark:to-slate-950" />
        </div>

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-600/20 rounded-full blur-[120px] animate-pulse mix-blend-screen pointer-events-none delay-1000" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 py-20 animate-slide-up">
          {/* Avatar Glass Container */}
          <div className="mb-10 flex justify-center">
            <div className="relative p-1 rounded-full bg-gradient-to-b from-blue-400 to-purple-600 shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(147,51,234,0.5)] transition-shadow duration-500 animate-float cursor-pointer">
              <div className="w-32 h-32 rounded-full glass flex items-center justify-center text-5xl overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-black/20">
                <span className="drop-shadow-lg">✨</span>
              </div>
            </div>
          </div>

          {/* Epic Typography Headlines */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight font-outfit">
            <span className="text-slate-900 dark:text-white drop-shadow-sm">你好，我是 </span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent text-glow">
              leik1000
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-delay">
            专注优雅的代码实践，探索 <span className="text-indigo-500 font-medium">AI 生成</span> 的边界，分享极具美感的技术之旅。
          </p>

          {/* Social Links Glass Row */}
          <div className="flex items-center justify-center gap-6 mb-14 animate-slide-up-delay">
            <SocialIcon
              href="https://github.com/leik1000/my_blog"
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>}
            />
            <SocialIcon
              href="mailto:409239349@qq.com"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            />
          </div>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up-delay">
            <Link
              href="/posts"
              className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold text-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">探索文章</span>
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 glass text-slate-900 dark:text-white rounded-full font-semibold text-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all hover:scale-105"
            >
              查看项目
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
          <svg className="w-6 h-6 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Content Section - Grid Pattern */}
      <div className="bg-grid-pattern relative pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-slate-50/80 to-slate-50 dark:from-slate-950/10 dark:via-slate-950/80 dark:to-slate-950 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <section className="mb-32">
            <div className="flex items-center justify-between mb-12 border-b border-slate-200 dark:border-slate-800 pb-4 mt-8">
              <h2 className="text-4xl font-extrabold font-outfit text-slate-900 dark:text-white">最新文章<span className="text-blue-600">.</span></h2>
              <Link href="/posts" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium relative group flex items-center gap-2">
                查看全部
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            {latestPosts.length > 0 ? (
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Feature the first post large */}
                <div className="lg:col-span-2">
                  <PostCard
                    key={latestPosts[0].slug}
                    {...latestPosts[0]}
                    featured={true}
                  />
                </div>
                {/* Secondary posts */}
                {latestPosts.slice(1).map(post => (
                  <PostCard
                    key={post.slug}
                    title={post.title}
                    summary={post.summary}
                    slug={post.slug}
                    date={post.date}
                    tags={post.tags}
                    cover={post.cover}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-3xl p-16 text-center text-slate-500 dark:text-slate-400">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-lg">暂无文章，敬请期待。</p>
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between mb-12 border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-4xl font-extrabold font-outfit text-slate-900 dark:text-white">兵器谱<span className="text-purple-600">.</span></h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/tools/image" className="group block h-full">
                <div className="glass-card h-full p-8 rounded-3xl relative overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500" />

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl mb-8 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                    🎨
                  </div>
                  <h3 className="text-2xl font-bold font-outfit mb-3 text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    AI 绘图引擎
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-8">
                    基于 ComfyUI 的快速图像生成服务，支持自定义提示词与高级控制。
                  </p>

                  <div className="absolute bottom-8 right-8 text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    启动 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </a>
  );
}
