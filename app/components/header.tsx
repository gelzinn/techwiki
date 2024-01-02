'use client';

import { useEffect, useState } from 'react';

import { useTheme } from '@/hooks/useTheme';

import { TechWikiLogo } from './logo';
import { Loading } from './loading';
import { Icon } from './icon';

export const Header = () => {
  const { theme, oppositeTheme, toggleTheme } = useTheme();

  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);

  const handleToggleTheme = () => toggleTheme();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (!search || searching || search.length < 1) return;

    const randomTime = Math.floor(Math.random() * 3000) + 1000;

    const timer = setTimeout(async () => {
      try {
        setSearching(true);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setSearching(false);
        }, randomTime);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <header className="sticky top-0 z-50 mx-auto flex items-center justify-center overflow-hidden border-b border-zinc-200 bg-zinc-100 text-black dark:border-zinc-900 dark:bg-black dark:text-zinc-50">
      <nav className="relative flex h-16 w-full max-w-screen-full-hd items-center justify-between p-4">
        <TechWikiLogo className="text-xl" isLink />

        <label
          className="absolute left-1/2 top-1/2 hidden h-10 w-full min-w-32 max-w-xl -translate-x-1/2 -translate-y-1/2 items-center justify-start overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 text-zinc-400 lg:flex dark:border-zinc-900 dark:bg-zinc-950 dark:text-zinc-600"
          htmlFor="search"
        >
          <div
            className={`ml-1 flex h-10 w-10 items-center justify-center ${
              searching ? '-ml-4 h-10 w-0 opacity-0' : 'opacity-100'
            } transition-all duration-300`}
          >
            <Icon name="Search" className={`h-4 w-4`} strokeWidth={1.5} />
          </div>

          <input
            type="text"
            placeholder="What are you looking for?"
            id="search"
            name="search"
            className="flex h-full w-full items-center justify-center bg-transparent text-sm text-zinc-600 outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-400 dark:placeholder:text-zinc-600 dark:focus:border-zinc-800"
            autoComplete="off"
            value={search}
            onChange={handleSearch}
            disabled={searching}
          />

          <div
            className={`mr-1 h-10 w-10 border-gray-950 dark:border-gray-50 ${
              !searching ? 'mr-4 hidden h-10 w-0 opacity-0' : 'opacity-100'
            } flex items-center justify-center bg-zinc-100 transition-all duration-300 dark:bg-zinc-950`}
          >
            <Loading
              className={`h-4 w-4
              ${searching ? 'opacity-100' : 'opacity-0'}
            `}
            />
          </div>

          <button
            className={` mr-1 flex h-10 w-10 items-center justify-center ${
              search && !searching
                ? 'h-10 w-10 opacity-100'
                : 'hidden opacity-0'
            } transition-all duration-300`}
            onClick={() => setSearch('')}
          >
            <Icon
              name="X"
              className={`h-4 w-4 ${
                search && !searching ? 'opacity-100' : 'opacity-0'
              }`}
              strokeWidth={1.5}
            />
          </button>
        </label>

        <button
          type="button"
          title={`Toggle to ${oppositeTheme} mode`}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 p-2 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          onClick={handleToggleTheme}
        >
          {theme === 'dark' ? (
            <Icon name="Sun" className="h-4 w-4" />
          ) : (
            <Icon name="Moon" className="h-4 w-4" />
          )}
        </button>
      </nav>
    </header>
  );
};
