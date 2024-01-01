'use client';

import { Fragment, useEffect, useState } from 'react';
import { Link, Image } from '@/infra/next/app';

import { Icon } from '@/components/icon';
import { TechWikiLogo } from '@/components/logo';

import { useTheme } from '@/hooks/useTheme';

import Masonry from 'react-masonry-css';

export default function AuthPage() {
  const { theme, oppositeTheme, toggleTheme } = useTheme();

  const [notes, setNotes] = useState([]);

  const handleToggleTheme = () => toggleTheme();

  useEffect(() => {
    try {
      fetch('/api/notes')
        .then((res) => res.json())
        .then(({ data }) => {
          let recentNotes = [];

          if (data.length > 16) recentNotes = data.slice(0, 16);
          else recentNotes = data;

          setNotes(recentNotes);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <main className="mx-auto flex h-screen min-h-screen w-full max-w-screen-full-hd flex-col items-start justify-start">
      <div className="grid h-full w-full max-w-screen-full-hd grid-cols-1 overflow-hidden lg:grid-cols-[40fr,60fr]">
        <section className="flex flex-1 flex-col items-center justify-center gap-4 border-zinc-200 p-4 sm:p-8 lg:border-r dark:border-zinc-900">
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
            <header className="z-50 mx-auto flex w-full items-center justify-center overflow-hidden">
              <TechWikiLogo />
            </header>

            <section className="my-auto flex w-full max-w-md flex-col items-center justify-center gap-4">
              <h1 className="flex flex-col items-center justify-center gap-2 text-balance text-2xl font-semibold tracking-title text-zinc-900 sm:flex-row sm:text-4xl dark:text-zinc-100">
                Ready to learn something new today?
              </h1>

              <p className="text-balance text-sm text-zinc-500 dark:text-zinc-400">
                Everything a tech enthusiast needs. All in one place.
              </p>

              <button className="mt-4 flex w-full items-center justify-center gap-4 rounded-md border border-zinc-200 bg-zinc-100 px-4 py-3 transition-all hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900">
                <Icon name="GithubIcon" size={20} />
                <span className="text-zinc-500 dark:text-zinc-400">
                  Sign in with GitHub
                </span>
              </button>
            </section>

            <footer className="flex w-full flex-col-reverse items-center justify-center gap-4 lg:flex-row lg:justify-between">
              <span className="w-full max-w-md text-sm text-zinc-500 lg:text-left dark:text-zinc-400">
                By continuing, you agree to our{' '}
                <Link
                  href="/terms"
                  className="text-zinc-500 underline dark:text-zinc-400"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="text-zinc-500 underline dark:text-zinc-400"
                >
                  Privacy Policy
                </Link>
                . TechWiki is not affiliated with GitHub.
              </span>

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
            </footer>
          </div>
        </section>

        <section className="relative hidden h-screen flex-1 flex-col items-center justify-center gap-4 overflow-hidden p-8 lg:flex">
          <MasonryLayout notes={notes} />
        </section>
      </div>
    </main>
  );
}

const MasonryLayout = ({ notes }: any) => (
  <>
    <div className="pointer-events-none absolute -top-1 z-10 h-2/4 w-full bg-gradient-to-b from-zinc-50 to-transparent opacity-65 dark:from-zinc-950 dark:to-transparent" />

    <div className="pointer-events-none absolute -bottom-1 z-10 h-2/4 w-full bg-gradient-to-t from-zinc-50 to-transparent opacity-65 dark:from-zinc-950 dark:to-transparent" />

    <div className="pointer-events-none absolute -left-1 z-10 h-full w-2/4 bg-gradient-to-r from-zinc-50 to-transparent opacity-65 dark:from-zinc-950 dark:to-transparent" />

    <div className="pointer-events-none absolute -right-1 z-10 h-full w-2/4 bg-gradient-to-l from-zinc-50 to-transparent opacity-65 dark:from-zinc-950 dark:to-transparent" />

    <Masonry
      breakpointCols={{
        default: 4,
        1280: 3,
        1024: 2,
      }}
      className="group absolute right-0 flex w-full flex-1 skew-x-[-5deg] gap-4 overflow-hidden lg:scale-110"
      columnClassName="flex flex-col gap-4 h-fit"
      style={{
        margin: 'auto',
      }}
    >
      {Array.from({ length: 16 }, (_, i) => i % notes.length).map(
        (index, i) => {
          const note = notes[index];

          if (!note)
            return (
              <div
                key={i}
                className="flex animate-pulse cursor-pointer flex-col items-start justify-start rounded-md border border-zinc-200 bg-zinc-100 p-4 shadow-zinc-50 transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-2xl dark:border-zinc-900 dark:bg-zinc-950 dark:shadow-zinc-950"
              >
                <picture className="pointer-events-none mb-4 h-full w-full select-none rounded-md bg-zinc-200 dark:bg-zinc-900">
                  <div className="pointer-events-none aspect-video animate-pulse select-none rounded-md bg-zinc-100 dark:bg-zinc-900" />
                </picture>

                <div className="flex w-full flex-col items-start justify-start gap-2">
                  {i % 2 === 0 ? (
                    Array.from({ length: 2 }, (_, i) => i).map((_, i) => (
                      <span
                        key={i}
                        className="h-3 w-1/2 rounded-md bg-zinc-200 font-medium dark:bg-zinc-900"
                        style={{
                          width: `${Math.random() * 100}%`,
                          minWidth: '50%',
                        }}
                      />
                    ))
                  ) : (
                    <span className="h-3 w-1/2 rounded-md bg-zinc-200 font-medium dark:bg-zinc-900" />
                  )}
                  <span className="h-3 w-1/4 rounded-md bg-zinc-200 text-xs dark:bg-zinc-900" />
                </div>
              </div>
            );

          const { thumbnail, title, description, slug, authors }: any = note;

          return (
            <Link
              tabIndex={-1}
              onFocus={(e) => e.preventDefault()}
              key={i}
              href={`/notes/${slug}`}
              className="flex h-fit cursor-pointer items-start rounded-md border border-zinc-200 bg-zinc-100 p-4 shadow-zinc-50 transition-all hover:-translate-x-1 hover:translate-y-1 hover:scale-[1.025] hover:shadow-xl dark:border-zinc-900 dark:bg-zinc-950 dark:shadow-zinc-950"
            >
              <div className="flex flex-col items-start justify-start gap-4">
                <picture className="pointer-events-none aspect-video h-full w-full select-none rounded-md bg-zinc-200 dark:bg-zinc-900">
                  <Image
                    src={thumbnail}
                    alt={title}
                    className="pointer-events-none aspect-video h-full w-full select-none rounded-md bg-zinc-200 dark:bg-zinc-900"
                    style={{ objectFit: 'cover' }}
                    width={640}
                    height={360}
                    quality={50}
                    loading="lazy"
                    loader={({ src }) => src}
                    about={`Thumbnail of ${title}`}
                  />
                </picture>

                <section className="flex flex-col items-start justify-start gap-2 text-xs">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {title}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {description}
                  </span>
                </section>

                {authors && (
                  <section
                    className="flex items-center justify-start gap-1.5 text-xs text-zinc-500 dark:text-zinc-400"
                    aria-label="Authors"
                  >
                    {authors && authors.length > 0 ? (
                      authors.map((author: string, index: number) => (
                        <Fragment key={index}>
                          <Link
                            tabIndex={-1}
                            onFocus={(e) => e.preventDefault()}
                            className="flex items-center justify-start hover:underline"
                            href={`/notes?author=${author}`}
                          >
                            <Image
                              src={`https://github.com/${author}.png`}
                              alt={author}
                              className="pointer-events-none mr-1 h-5 w-5 select-none rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-900"
                              width={24}
                              height={24}
                              loading="lazy"
                              about={`Avatar of ${author}`}
                            />

                            <span className="text-sm">{author}</span>
                          </Link>

                          {index === authors.length - 2 && (
                            <span className="pointer-events-none text-sm">
                              {' '}
                              and
                            </span>
                          )}

                          {index < authors.length - 2 && (
                            <span className="pointer-events-none text-sm">
                              ,
                            </span>
                          )}
                        </Fragment>
                      ))
                    ) : (
                      <span
                        className="text-sm text-zinc-500 dark:text-zinc-400"
                        aria-label="Anonymous"
                      >
                        Anonymous author.
                      </span>
                    )}
                  </section>
                )}
              </div>
            </Link>
          );
        },
      )}
    </Masonry>
  </>
);
