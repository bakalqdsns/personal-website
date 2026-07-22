'use client';

import { useEffect, useState } from 'react';
import { type Theme, applyTheme, getStoredTheme, getSystemTheme, setStoredTheme } from '@/lib/theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initial = getStoredTheme() ?? 'dark';
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setStoredTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`切换到${theme === 'dark' ? '亮' : '暗'}色模式`}
      title={`切换到${theme === 'dark' ? '亮' : '暗'}色模式`}
      data-cursor="pointer"
      className="group fixed right-5 top-5 z-[70] grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/30 text-fg/80 backdrop-blur-md transition hover:border-cyan/60 hover:text-cyan"
    >
      <span className="sr-only">主题切换</span>
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}