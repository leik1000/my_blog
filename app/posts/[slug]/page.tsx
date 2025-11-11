import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { CommentForm } from '@/components/CommentForm';
import { CommentList } from '@/components/CommentList';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // ISR

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
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

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {/* 面包屑 */}
      <nav className="mb-8 text-sm text-slate-600 dark:text-slate-400">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <Link href="/posts" className="hover:text-blue-600">文章</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 dark:text-white">{post.title}</span>
      </nav>

      {/* 文章头 */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <time>{new Date(post.date).toLocaleDateString('zh-CN')}</time>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <Link key={tag} href={`/posts?tag=${tag}`} className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200">
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* 文章封面 */}
      {post.cover && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image src={post.cover} alt={post.title} width={800} height={400} className="w-full h-96 object-cover" />
        </div>
      )}

      {/* 文章内容 */}
      <article className="prose dark:prose-invert max-w-none mb-12">
        <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      {/* 分隔线 */}
      <hr className="my-12 dark:border-slate-700" />

      {/* 评论区 */}
      <section className="space-y-8">
        <CommentForm post_slug={post.slug} />
        <CommentList post_slug={post.slug} />
      </section>

      {/* 导航 */}
      <nav className="mt-12 pt-8 border-t dark:border-slate-700 flex justify-between">
        <div>← 上一篇</div>
        <div>下一篇 →</div>
      </nav>
    </div>
  );
}
