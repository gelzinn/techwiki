'use client';

import { CSSProperties, useState } from 'react';
import { useRouter } from '@/infra/next/app';

import { TechWikiLogo } from '@/components/logo';
import { Icon } from '@/components/icon';

import { cards } from '@/config/home/cards';
import { Loading } from '@/components/loading';
import { toast } from '@/infra/sonner';

export default function Homepage() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSearching(true);

      if (!search) return;

      router.push(`/explore?q=${search}`);
    } catch (error) {
      toast.error('Something went wrong, please try again later.');
    } finally {
      setSearching(false);
    }
  };

  return (
    <main className="mx-auto flex h-auto min-h-screen w-full max-w-screen-full-hd flex-col">
      <section className="mx-auto flex h-full w-full max-w-5xl flex-1 flex-col items-center justify-start px-4 py-8">
        <div className="flex w-full flex-1 flex-col items-center justify-start gap-4 text-zinc-950 dark:text-zinc-50">
          <span
            className="flex w-fit items-center justify-center gap-4 rounded-md border border-emerald-500 bg-emerald-100 px-4 py-2 text-center text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/25 dark:text-zinc-50"
            role="alert"
          >
            <span className="pointer-events-none select-none text-emerald-500">
              ✦
            </span>
            <p>
              TechWiki is under development!
            </p>
            <span className="pointer-events-none select-none text-emerald-500">
              ✦
            </span>
          </span>

          <div
            className="my-8 mb-auto flex w-full flex-col items-center justify-center gap-1"
            style={
              {
                textWrap: 'wrap',
              } as CSSProperties
            }
          >
            <TechWikiLogo className="text-5xl" />

            <span className="text-center text-zinc-500 dark:text-zinc-400">
              The open source encyclopedia for all tech-related topics.
            </span>

            <form
              className="mt-8 flex w-full flex-col items-center justify-center gap-2"
              onSubmit={handleSubmit}
            >
              <label
                className="flex h-12 w-full min-w-32 max-w-3xl items-center justify-start overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-900 dark:bg-zinc-950 dark:text-zinc-600"
                htmlFor="search"
              >
                <button
                  type="submit"
                  className="ml-1 flex h-10 w-10 items-center justify-center transition-all duration-100"
                >
                  <Icon name="Search" className="h-4 w-4" strokeWidth={1.5} />
                </button>

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
                    !searching
                      ? 'mr-4 hidden h-10 w-0 opacity-0'
                      : 'opacity-100'
                  } flex items-center justify-center bg-zinc-100 transition-all duration-300 dark:bg-zinc-950`}
                >
                  <Loading
                    className={`h-4 w-4
                      ${searching ? 'opacity-100' : 'opacity-0'}
                    `}
                  />
                </div>

                {/* <button
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
                </button> */}
              </label>

              <a
                href="/explore/random"
                className="relative mt-4 flex min-h-10 w-full flex-col items-start justify-center gap-2 rounded-md border border-zinc-200 p-4 text-center text-sm text-zinc-500 hover:bg-zinc-100 sm:w-fit sm:flex-row sm:items-center sm:border-0 sm:px-4 sm:py-2 sm:text-inherit dark:border-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-900"
              >
                <Icon
                  name="Dices"
                  className="h-6 w-6 text-zinc-950 sm:h-4 sm:w-4 sm:text-zinc-500 dark:text-zinc-50 sm:dark:text-zinc-400"
                />
                <span className="text-left text-sm max-sm:text-zinc-500 sm:text-inherit max-sm:dark:text-zinc-400">
                  Want to explore? Click here to get a random article!
                </span>
              </a>
            </form>
          </div>

          {cards && cards.length > 0 && (
            <div className="mb-4 grid w-full grid-cols-1 gap-4 sm:py-8 md:grid-cols-2">
              {cards.map((card, index) => {
                const { title, description, href } = card;

                return (
                  <a
                    key={index}
                    href={href}
                    className="group flex w-full items-center justify-between gap-2 rounded-md border border-zinc-200 bg-zinc-100 p-4 text-sm text-white hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                  >
                    <div
                      className="flex flex-col items-start justify-start"
                      role="img"
                      aria-label={title}
                    >
                      <strong className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                        {title}
                      </strong>
                      <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                        {description}
                      </p>
                    </div>

                    <Icon
                      name="ChevronRight"
                      className="hidden h-6 w-6 text-zinc-500 transition-opacity duration-200 group-hover:opacity-0 sm:block dark:text-zinc-400"
                    />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
