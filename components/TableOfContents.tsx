'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 从文章内容中提取所有标题
    const article = document.querySelector('article');
    if (!article) return;

    const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const items: TocItem[] = [];

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.substring(1));
      const text = heading.textContent || '';
      const id = `heading-${index}`;

      // 给标题添加 id，方便锚点跳转
      heading.id = id;

      items.push({ id, text, level });
    });

    setToc(items);

    // 监听滚动，高亮当前章节
    const handleScroll = () => {
      const headingElements = Array.from(headings);

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i] as HTMLElement;
        const rect = heading.getBoundingClientRect();

        if (rect.top <= 100) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // 距离顶部的偏移
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (toc.length === 0) {
    return (
      <div className="sticky top-28 glass-card p-6">
        <h3 className="font-bold text-lg font-outfit mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          目录导航
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">暂无目录结构。</p>
      </div>
    );
  }

  return (
    <div className="sticky top-28 glass-card p-6">
      <h3 className="font-bold text-lg font-outfit mb-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        目录导航
      </h3>
      <nav className="space-y-1 text-sm font-medium">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`block py-2 px-3 rounded-lg transition-all duration-300 ${activeId === item.id
              ? 'bg-gradient-to-r from-blue-500/10 to-transparent text-blue-600 dark:text-blue-400 border-l-2 border-blue-500'
              : 'border-l-2 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-blue-400 text-slate-600 dark:text-slate-400'
              }`}
            style={{ paddingLeft: `${(item.level - 1) * 0.75 + 0.75}rem` }}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

