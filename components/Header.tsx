'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabaseClient } from '@/lib/supabase';

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!supabaseClient?.auth) {
      console.warn('Supabase 客户端未配置，跳过登录检测');
      setLoading(false);
      return;
    }

    const client = supabaseClient!;

    const checkUser = async () => {
      try {
        const { data: { session } } = await client.auth.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      } catch (err) {
        console.error('检查登录状态失败:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = client.auth.onAuthStateChange((event: any, session: any) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = async () => {
    try {
      if (!supabaseClient?.auth) {
        throw new Error('Supabase 未配置');
      }
      await supabaseClient.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error('登出失败:', err);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50 dark:border-slate-700/50' 
          : 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
            我的博客
          </Link>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/posts" className="relative group px-3 py-2">
              <span className="relative z-10 hover:text-blue-600 transition-colors">文章</span>
              <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg scale-0 group-hover:scale-100 transition-transform"></span>
            </Link>
            <Link href="/projects" className="relative group px-3 py-2">
              <span className="relative z-10 hover:text-blue-600 transition-colors">项目</span>
              <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg scale-0 group-hover:scale-100 transition-transform"></span>
            </Link>
            <Link href="/tools/image" className="relative group px-3 py-2">
              <span className="relative z-10 hover:text-blue-600 transition-colors">工具</span>
              <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg scale-0 group-hover:scale-100 transition-transform"></span>
            </Link>
            <Link href="/about" className="relative group px-3 py-2">
              <span className="relative z-10 hover:text-blue-600 transition-colors">关于</span>
              <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg scale-0 group-hover:scale-100 transition-transform"></span>
            </Link>

            <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110"
              title="切换深浅色"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {user.email?.split('@')[0]}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all hover:scale-105"
                    >
                      登出
                    </button>
                  </div>
                ) : (
                  <Link href="/auth/login" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105">
                    登录
                  </Link>
                )}
              </>
            )}
          </div>

          {/* 移动端汉堡菜单按钮 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="菜单"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              )}
            </svg>
          </button>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-200 dark:border-slate-700 space-y-2 animate-slide-down">
            <Link href="/posts" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              文章
            </Link>
            <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              项目
            </Link>
            <Link href="/tools/image" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              工具
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              关于
            </Link>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between px-4">
              <button
                onClick={toggleDarkMode}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                {isDarkMode ? '☀️ 浅色' : '🌙 深色'}
              </button>

              {!loading && (
                <>
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      登出
                    </button>
                  ) : (
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      登录
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* 滚动进度条 */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left scale-x-0 transition-transform duration-300" 
           style={{ transform: isScrolled ? 'scaleX(1)' : 'scaleX(0)' }}>
      </div>
    </header>
  );
}
