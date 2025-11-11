import Link from 'next/link';

interface PostCardProps {
  title: string;
  summary: string;
  slug: string;
  date: string;
  tags: string[];
  cover?: string;
}

export function PostCard({ title, summary, slug, date, tags }: PostCardProps) {
  return (
    <Link href={`/posts/${slug}`}>
      <div className="p-4 border rounded-lg hover:shadow-lg transition dark:border-slate-700 dark:hover:bg-slate-800 cursor-pointer">
        <h3 className="text-xl font-bold mb-2 hover:text-blue-600">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {tags.map(tag => (
              <span key={tag} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <time className="text-xs text-slate-500">{new Date(date).toLocaleDateString('zh-CN')}</time>
        </div>
      </div>
    </Link>
  );
}
