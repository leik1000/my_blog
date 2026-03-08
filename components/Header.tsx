'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-4 px-4 sm:px-6 lg:px-8`}
    >
      <nav
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-500 ${isScrolled
          ? 'glass py-3 px-6'
          : 'bg-transparent py-4'
          }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-black font-outfit tracking-tight group flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              ⚡
            </span>
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              leik1000
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 font-medium font-outfit">
            <NavLink href="/posts">文章</NavLink>
            <NavLink href="/projects">项目</NavLink>
            <NavLink href="/tools/image">兵器谱</NavLink>
            <NavLink href="/about">关于</NavLink>

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-4"></div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-110 active:scale-95 group relative overflow-hidden"
              title="Toggle Theme"
            >
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">{isDarkMode ? '☀️' : '🌙'}</span>
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-2 w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-2 pb-2 animate-slide-up origin-top">
            <MobileNavLink href="/posts" onClick={() => setIsMobileMenuOpen(false)}>文章</MobileNavLink>
            <MobileNavLink href="/projects" onClick={() => setIsMobileMenuOpen(false)}>项目</MobileNavLink>
            <MobileNavLink href="/tools/image" onClick={() => setIsMobileMenuOpen(false)}>兵器谱</MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>关于</MobileNavLink>

            <div className="pt-4 mt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between px-2">
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium"
              >
                <span className="text-xl">{isDarkMode ? '☀️' : '🌙'}</span>
                {isDarkMode ? '浅色模式' : '深色模式'}
              </button>

            </div>
          </div>
        )}
      </nav>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left transition-transform duration-300 w-full"
        style={{ transform: isScrolled ? 'scaleX(1)' : 'scaleX(0)' }} />
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group px-4 py-2 outline-none">
      <span className="relative z-10 text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 font-medium tracking-wide">{children}</span>
      <span className="absolute inset-0 bg-slate-100 dark:bg-slate-800/50 rounded-xl scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium font-outfit transition-colors"
    >
      {children}
    </Link>
  );
}
