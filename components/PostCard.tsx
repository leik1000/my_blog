import Link from 'next/link';

interface PostCardProps {
  title: string;
  summary: string;
  slug: string;
  date: string;
  tags: string[];
  cover?: string;
}

export function PostCard({ title, summary, slug, date, tags, cover }: PostCardProps) {
  return (
    <Link href={`/posts/${slug}`} className="group">
      <article className="relative overflow-hidden rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all duration-500 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 cursor-pointer">
        {/* 渐变背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* 顶部渐变线 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

        {/* 封面图片（如果有） */}
        {cover && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={cover} 
              alt={title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        )}

        {/* 内容区域 */}
        <div className="relative p-6">
          {/* 标题 */}
          <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>

          {/* 摘要 */}
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
            {summary}
          </p>

          {/* 底部信息 */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            {/* 标签 */}
            <div className="flex gap-2 flex-wrap">
              {tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* 日期和箭头 */}
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <time className="text-sm">
                {new Date(date).toLocaleDateString('zh-CN', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </time>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* 阅读提示 */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            阅读全文
          </div>
        </div>
      </article>
    </Link>
  );
}
