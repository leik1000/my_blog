import { getPostsByTag, getAllPosts } from '@/lib/mdx';
import { PostCard } from '@/components/PostCard';
import Link from 'next/link';

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).map(tag => ({ tag }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div className="container mx-auto px-4 py-12">
      <nav className="mb-8 text-sm text-slate-600 dark:text-slate-400">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <Link href="/posts" className="hover:text-blue-600">文章</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 dark:text-white">标签: {decodedTag}</span>
      </nav>

      <h1 className="text-4xl font-bold mb-2">标签: {decodedTag}</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">找到 {posts.length} 篇文章</p>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">该标签下暂无文章</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map(post => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              summary={post.summary}
              date={post.date}
              tags={post.tags}
              cover={post.cover}
            />
          ))}
        </div>
      )}
    </div>
  );
}
