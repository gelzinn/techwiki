'use client';

import { useTheme } from 'app/hooks/useTheme';

import { Menu, Moon, PanelRightClose, Sun } from 'lucide-react';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-center bg-zinc-50 text-black dark:bg-black dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-900 mx-auto overflow-hidden">
      <nav className="relative flex flex-row-reverse lg:flex-row items-center justify-between w-full max-w-screen-desktop h-16 px-8 py-4">
        <button
          type="button"
          title="Toggle navigation menu"
          className="p-2 rounded-md bg-zinc-200 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-900"
        >
          <span className="sr-only">Toggle navigation menu</span>

          <PanelRightClose
            className="hidden lg:block w-4 h-4 -rotate-180"
            aria-hidden="true"
          />

          <Menu className="block lg:hidden w-4 h-4" aria-hidden="true" />
        </button>

        <h1 className="text-xl">
          <a href="/">
            <span className="font-medium">Tech</span>
            <span className="font-light">Wiki</span>
          </a>
        </h1>

        <button
          type="button"
          title={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="block p-2 rounded-md bg-zinc-200 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-900"
          onClick={() => toggleTheme()}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </nav>
    </header>
  );
};
