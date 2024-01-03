'use client';

import { useEffect, useState } from 'react';

import { Link } from '@/infra/next/app';

import { useTheme } from '@/hooks/useTheme';
import { nav } from '@/config/header/nav';

import { TechWikiLogo } from '@/components/logo';
import { Icon } from '@/components/icon';

export const Header = () => {
  const { theme, oppositeTheme, toggleTheme } = useTheme();

  const [isOpen, setOpen] = useState(false);
  const [selectedMenuOpen, setSelectedMenuOpen] = useState(false);

  const handleToggleTheme = () => toggleTheme();

  const handleToggleMenu = (state?: boolean) => {
    if (state) setSelectedMenuOpen(state);
    else setSelectedMenuOpen(!isOpen);
  };

  const handleToggleFullMenu = (state?: boolean) => {
    if (state) {
      setOpen(state);
      setSelectedMenuOpen(state);
    } else {
      if (isOpen) {
        setOpen(false);
        setSelectedMenuOpen(false);
      } else {
        setOpen(true);
        setSelectedMenuOpen(true);
      }
    }
  };

  useEffect(() => {
    setOpen(selectedMenuOpen);
  }, [selectedMenuOpen]);

  useEffect(() => {
    const width = window.innerWidth;

    const handleResize = () => {
      if (selectedMenuOpen && width < 640) handleToggleFullMenu(false);
    };

    if (typeof window === 'undefined') return;

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-10 mx-auto flex items-center justify-center ${
        isOpen ? 'h-screen' : 'h-16 overflow-hidden'
      } border-b border-zinc-200 bg-zinc-100 text-black dark:border-zinc-900 dark:bg-black dark:text-zinc-50`}
      aria-label="Header"
    >
      <div
        className="flex h-auto w-full max-w-screen-full-hd items-center justify-between gap-2 p-4"
        aria-label="Header content"
      >
        <div
          className="flex h-10 w-auto items-center justify-center gap-2"
          aria-label="TechWiki"
        >
          <TechWikiLogo className="pr-2 text-xl" isLink />

          <nav
            className={`${
              isOpen
                ? 'z-50 h-screen w-full flex-col bg-zinc-100 dark:bg-zinc-900'
                : 'pointer-events-none select-none opacity-0 sm:pointer-events-auto sm:select-auto sm:opacity-100'
            } absolute left-0 top-0 flex h-auto w-auto items-center justify-center gap-2 sm:relative sm:bg-transparent`}
            aria-label="Main navigation"
          >
            {nav.map((item) => {
              const { title, key, href } = item;

              return (
                <Link
                  href={href}
                  key={key}
                  className={`flex h-10 w-auto items-center justify-center rounded-md px-4 py-2 text-sm ${
                    isOpen
                      ? 'hover:bg-zinc-200 dark:hover:bg-zinc-950'
                      : 'text-zinc-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-900'
                  }`}
                  onClick={() => handleToggleFullMenu(false)}
                >
                  {title}
                </Link>
              );
            })}
          </nav>
        </div>

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
            className="hidden h-10 w-auto items-center justify-center text-nowrap rounded-md border border-rose-400 bg-rose-500 px-6 py-2 text-sm text-zinc-50 sm:flex"
          >
            Sign up
          </button>

          <button
            type="button"
            className={`flex h-10 w-10 sm:hidden ${
              isOpen ? 'fixed right-4 top-3' : ''
            } z-50 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 text-sm text-zinc-600 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900`}
            onClick={() => handleToggleMenu()}
          >
            <Icon name={isOpen ? 'X' : 'Menu'} className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
