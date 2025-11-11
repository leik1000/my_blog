'use client';

export function Footer() {
  return (
    <footer className="border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">导航</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/posts" className="hover:text-blue-600">文章</a></li>
              <li><a href="/projects" className="hover:text-blue-600">项目</a></li>
              <li><a href="/about" className="hover:text-blue-600">关于</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">社交</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600">GitHub</a></li>
              <li><a href="#" className="hover:text-blue-600">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t dark:border-slate-700 pt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} My Blog. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
}
