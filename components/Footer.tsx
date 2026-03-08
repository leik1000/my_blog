'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
      {/* Background Glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Abstract */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="inline-block text-3xl font-black font-outfit tracking-tight mb-6 group flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
                ⚡
              </span>
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-colors duration-300">
                leik1000
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light pr-4">
              分享技术见解，记录项目经验，探索创新可能。用代码改变世界，用文字传递价值。打造极致审美与技术的完美融合。
            </p>
            <div className="flex gap-4 mt-8">
              <SocialIcon href="https://github.com/leik1000/my_blog" title="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </SocialIcon>
              <SocialIcon href="https://twitter.com" title="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              </SocialIcon>
              <SocialIcon href="mailto:409239349@qq.com" title="Email">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Navigation Links */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="font-bold text-lg font-outfit text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> 导航
            </h4>
            <ul className="space-y-4">
              <FooterLink href="/posts">文章</FooterLink>
              <FooterLink href="/projects">项目</FooterLink>
              <FooterLink href="/tools/image">兵器谱</FooterLink>
              <FooterLink href="/about">关于本站</FooterLink>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-bold text-lg font-outfit text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> 资源
            </h4>
            <ul className="space-y-4">
              <FooterLink href="#">RSS 订阅</FooterLink>
              <FooterLink href="#">服务条款</FooterLink>
              <FooterLink href="#">隐私政策</FooterLink>
              <FooterLink href="#">网站地图</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between text-slate-500 dark:text-slate-400">
          <p className="mb-4 md:mb-0 text-sm">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-900 dark:text-white font-outfit">leik1000</span>. 保留所有权利。
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            使用 <span className="text-red-500 animate-pulse">❤️</span> 由 Next.js 和 Tailwind 构建
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ring-1 ring-slate-200/50 dark:ring-slate-700/50"
      title={title}
    >
      {children}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
        <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-blue-500 opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-2">›</span>
        <span>{children}</span>
      </Link>
    </li>
  );
}
