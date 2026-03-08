import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { TableOfContents } from '@/components/TableOfContents';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Markdown from 'markdown-to-jsx';

export const revalidate = 3600; // ISR

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} - 博客`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.cover ? [post.cover] : [],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* 阅读进度条 */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 z-40">
        <div id="reading-progress" className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150" style={{ width: '0%' }}></div>
      </div>

      <div className="container mx-auto px-4 py-32 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-12 text-sm flex items-center gap-2 text-slate-500 dark:text-slate-400 font-outfit">
          <Link href="/" className="hover:text-blue-600 transition-colors">首页</Link>
          <span>/</span>
          <Link href="/posts" className="hover:text-blue-600 transition-colors">文章</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium truncate">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* Post Header */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 font-outfit tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-8 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                      <span className="text-xs">👋</span>
                    </div>
                  </div>
                  <span>leik1000</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time>{new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>约 5 分钟阅读</span>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/posts?tag=${tag}`}
                    className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 transition-all ring-1 ring-slate-200/50 dark:ring-slate-700/50"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </header>

            {/* Post Cover */}
            {post.cover && (
              <div className="mb-14 rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-200/50 dark:ring-slate-700/50 relative group">
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-10" />
                <Image src={post.cover} alt={post.title} width={1200} height={600} className="w-full h-[60vh] object-cover hover:scale-105 transition-transform duration-700" priority />
              </div>
            )}

            {/* Post Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none mb-20 prose-headings:font-outfit prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-img:rounded-[2rem] prose-img:shadow-2xl prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
              <Markdown
                options={{
                  overrides: {
                    h1: { props: { className: 'scroll-mt-32' } },
                    h2: { props: { className: 'scroll-mt-32 border-b border-slate-200 dark:border-slate-800 pb-2' } },
                    h3: { props: { className: 'scroll-mt-32 text-slate-800 dark:text-slate-200' } },
                    p: { props: { className: 'leading-loose text-slate-600 dark:text-slate-400 mb-6' } },
                    ul: { props: { className: 'list-disc pl-6 mb-6 marker:text-blue-500' } },
                    li: { props: { className: 'text-slate-600 dark:text-slate-400' } },
                    code: { props: { className: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-lg text-sm font-semibold before:hidden after:hidden' } },
                    blockquote: { props: { className: 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-r-2xl text-slate-700 dark:text-slate-300 not-italic shadow-inner' } },
                  }
                }}
              >
                {post.content}
              </Markdown>
            </article>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 glass-card rounded-3xl mb-16 gap-4">
              <div className="flex gap-4 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-105 ring-1 ring-slate-200/50 dark:ring-slate-700/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="font-medium">喜欢</span>
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-purple-50 dark:hover:bg-purple-500/10 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all hover:scale-105 ring-1 ring-slate-200/50 dark:ring-slate-700/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="font-medium">收藏</span>
                </button>
              </div>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>分享</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-8">
            {/* Table of Contents */}
            <TableOfContents />

            {/* Author Profile Card */}
            <div className="glass-card p-8 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-white dark:bg-slate-800 p-1 shadow-xl shadow-blue-500/10 mb-6 group-hover:-translate-y-2 transition-transform duration-500 mt-6">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl">
                    👨‍💻
                  </div>
                </div>
                <h3 className="text-xl font-bold font-outfit mb-2">leik1000</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-4 bg-blue-500/10 py-1.5 px-4 rounded-full inline-block">全栈开发者</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  专注于前端与后端技术，热爱分享与交流。用代码改变世界，探索优雅的技术方案。
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 添加阅读进度脚本 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          if (typeof window !== 'undefined') {
            window.addEventListener('scroll', function() {
              const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
              const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              const scrolled = (winScroll / height) * 100;
              const progressBar = document.getElementById('reading-progress');
              if (progressBar) {
                progressBar.style.width = scrolled + '%';
              }
            });
          }
        `
      }} />
    </>
  );
}
