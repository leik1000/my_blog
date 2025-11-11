import { getAllPosts } from '@/lib/mdx';
import { PostCard } from '@/components/PostCard';

export const revalidate = 3600; // ISR - 每小时重新生成

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">所有文章</h1>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">暂无文章</p>
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
