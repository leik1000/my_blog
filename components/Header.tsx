'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabaseClient } from '@/lib/supabase';

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查用户登录状态
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabaseClient.auth.getSession();
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

    // 监听认证状态变化
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = async () => {
    try {
      await supabaseClient.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error('登出失败:', err);
    }
  };

  return (
    <header className="border-b dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          我的博客
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/posts" className="hover:text-blue-600 transition">文章</Link>
          <Link href="/projects" className="hover:text-blue-600 transition">项目</Link>
          <Link href="/tools/image" className="hover:text-blue-600 transition">工具</Link>
          <Link href="/about" className="hover:text-blue-600 transition">关于</Link>

          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 rounded-lg bg-slate-200 dark:bg-slate-700"
            title="切换深浅色"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    登出
                  </button>
                </div>
              ) : (
                <Link href="/auth/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  登录
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
