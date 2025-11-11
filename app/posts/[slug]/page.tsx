import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { CommentForm } from '@/components/CommentForm';
import { CommentList } from '@/components/CommentList';
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

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* 面包屑 */}
        <nav className="mb-8 text-sm flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition">首页</Link>
          <span>/</span>
          <Link href="/posts" className="hover:text-blue-600 transition">文章</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 主内容区 */}
          <div className="lg:col-span-8">
            {/* 文章头 */}
            <header className="mb-10">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <time>{new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>约 5 分钟阅读</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {post.tags.map(tag => (
                  <Link 
                    key={tag} 
                    href={`/posts?tag=${tag}`} 
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:border-blue-500/40 transition-all hover:scale-105"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </header>

            {/* 文章封面 */}
            {post.cover && (
              <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image src={post.cover} alt={post.title} width={800} height={400} className="w-full h-96 object-cover" />
              </div>
            )}

            {/* 文章内容 */}
            <article className="prose prose-lg dark:prose-invert max-w-none mb-16 prose-headings:scroll-mt-24">
              <Markdown
                options={{
                  overrides: {
                    h1: { props: { className: 'text-4xl font-bold mt-8 mb-4' } },
                    h2: { props: { className: 'text-3xl font-bold mt-8 mb-4' } },
                    h3: { props: { className: 'text-2xl font-bold mt-6 mb-3' } },
                    h4: { props: { className: 'text-xl font-bold mt-4 mb-2' } },
                    p: { props: { className: 'text-lg leading-loose mb-4' } },
                    ul: { props: { className: 'list-disc pl-6 mb-4' } },
                    ol: { props: { className: 'list-decimal pl-6 mb-4' } },
                    code: { props: { className: 'bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm' } },
                  }
                }}
              >
                {post.content}
              </Markdown>
            </article>

            {/* 文章底部操作栏 */}
            <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 mb-12">
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-blue-500 transition-all hover:scale-105">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                  <span className="text-sm font-medium">点赞</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-blue-500 transition-all hover:scale-105">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                  <span className="text-sm font-medium">收藏</span>
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-blue-500 transition-all hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
                <span className="text-sm font-medium">分享</span>
              </button>
            </div>

            {/* 分隔线 */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent my-12"></div>

            {/* 评论区 */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                </svg>
                评论交流
              </h2>
              <CommentForm post_slug={post.slug} />
              <CommentList post_slug={post.slug} />
            </section>

            {/* 上下篇导航 */}
            <nav className="mt-16 pt-8 border-t dark:border-slate-700 grid grid-cols-2 gap-4">
              <Link href="#" className="group p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all">
                <div className="text-sm text-slate-500 mb-2">← 上一篇</div>
                <div className="font-medium group-hover:text-blue-600 transition">文章标题</div>
              </Link>
              <Link href="#" className="group p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all text-right">
                <div className="text-sm text-slate-500 mb-2">下一篇 →</div>
                <div className="font-medium group-hover:text-blue-600 transition">文章标题</div>
              </Link>
            </nav>
          </div>

          {/* 侧边栏 */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 目录 */}
            <TableOfContents />

            {/* 作者信息 */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-blue-200/50 dark:border-blue-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                  👨‍💻
                </div>
                <div>
                  <div className="font-bold text-lg">作者</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">全栈开发者</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                专注于前端与后端技术，热爱分享与交流。
              </p>
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
