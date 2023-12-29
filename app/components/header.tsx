'use client';

import { useTheme } from '@/hooks/useTheme';

import { Menu, Moon, PanelRightClose, Sun } from 'lucide-react';
import { TechWikiLogo } from './logo';

export const Header = () => {
  const { theme, oppositeTheme, toggleTheme } = useTheme();

  const handleToggleTheme = () => toggleTheme();

  return (
    <header className="sticky top-0 z-50 mx-auto flex items-center justify-center overflow-hidden border-b border-zinc-200 bg-zinc-100 text-black dark:border-zinc-900 dark:bg-black dark:text-zinc-50">
      <nav className="relative flex h-16 w-full max-w-screen-full-hd flex-row-reverse items-center justify-between p-4 lg:flex-row">
        <button
          type="button"
          title="Toggle navigation menu"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 p-2 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <span className="sr-only">Toggle navigation menu</span>

          <PanelRightClose
            className="hidden h-4 w-4 -rotate-180 lg:block"
            aria-hidden="true"
          />

          <Menu className="block h-4 w-4 lg:hidden" aria-hidden="true" />
        </button>

        <TechWikiLogo className="text-xl" isLink />

        <button
          type="button"
          title={`Toggle to ${oppositeTheme} mode`}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 p-2 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          onClick={handleToggleTheme}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </nav>
    </header>
  );
};
