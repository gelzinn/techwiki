'use client';

import { useEffect, useState } from 'react';

import { useTheme } from '@/hooks/useTheme';

import { TechWikiLogo } from './logo';
import { Loading } from './loading';
import { Icon } from './icon';

export const Header = () => {
  const { theme, oppositeTheme, toggleTheme } = useTheme();

  const handleToggleTheme = () => toggleTheme();

  return (
    <header className="sticky top-0 z-50 mx-auto flex items-center justify-center overflow-hidden border-b border-zinc-200 bg-zinc-100 text-black dark:border-zinc-900 dark:bg-black dark:text-zinc-50">
      <nav className="relative flex h-20 w-full max-w-screen-full-hd items-center justify-between gap-2 p-4">
        <TechWikiLogo className="pr-2 text-xl" isLink />

        <div className="flex h-10 w-auto items-center justify-center gap-2">
          <button
            type="button"
            title={`Toggle to ${oppositeTheme} mode`}
            className="hidden aspect-square h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 p-2 hover:bg-zinc-200 sm:flex dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            onClick={handleToggleTheme}
          >
            {theme === 'dark' ? (
              <Icon name="Sun" className="h-4 w-4" />
            ) : (
              <Icon name="Moon" className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            className="flex h-10 w-auto items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            Login
          </button>

          <button
            type="button"
            className="flex h-10 w-auto items-center justify-center text-nowrap rounded-md border border-rose-400 bg-rose-500 px-6 py-2 text-sm text-zinc-50"
          >
            Sign up
          </button>
        </div>
      </nav>
    </header>
  );
};
