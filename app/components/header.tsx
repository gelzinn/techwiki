'use client';

import { useState } from 'react';
import { useTheme } from 'app/hooks/useTheme';

import { Menu, Moon, PanelRightClose, Sun } from 'lucide-react';
import { TechWikiLogo } from './logo';

export const Header = () => {
  const { theme, oppositeTheme, toggleTheme } = useTheme();

  const handleToggleTheme = () => toggleTheme();

  return (
    <header
      className="flex items-center justify-center bg-zinc-50 text-black dark:bg-black dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-900 mx-auto overflow-hidden"
      id="main-header"
    >
      <nav className="relative flex flex-row-reverse lg:flex-row items-center justify-between w-full max-w-screen-full-hd h-16 p-4">
        <button
          type="button"
          title="Toggle navigation menu"
          className="flex items-center justify-center p-2 w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        >
          <span className="sr-only">Toggle navigation menu</span>

          <PanelRightClose
            className="hidden lg:block w-4 h-4 -rotate-180"
            aria-hidden="true"
          />

          <Menu className="block lg:hidden w-4 h-4" aria-hidden="true" />
        </button>

        <TechWikiLogo className="text-xl" isLink />

        <button
          type="button"
          title={`Toggle to ${oppositeTheme} mode`}
          className="flex items-center justify-center p-2 w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-900"
          onClick={handleToggleTheme}
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
