'use client';

import { TechWikiLogo } from '@/components/logo';

import { GithubIcon } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { Fragment, useEffect, useState } from 'react';

import Masonry from 'react-masonry-css';

export default function AuthPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    try {
      fetch('/api/notes')
        .then((res) => res.json())
        .then(({ data }) => setNotes(data));
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <main className="mx-auto flex h-screen min-h-screen w-full max-w-screen-full-hd flex-col items-start justify-start">
      <div className="grid h-full w-full max-w-screen-full-hd grid-cols-1 lg:grid-cols-[1fr,1fr]">
        <section className="relative hidden h-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden p-8 lg:flex">
          <MasonryLayout notes={notes} />
        </section>

        <section className="flex flex-1 flex-col items-center justify-center gap-4 border-zinc-200 p-4 sm:p-8 lg:border-l dark:border-zinc-900">
          <div className="flex h-full w-full max-w-md flex-col items-center justify-center gap-4 text-center">
            <TechWikiLogo />

            <section className="my-auto flex w-full flex-col items-center justify-center gap-4">
              <h1 className="flex flex-col items-center justify-center gap-2 text-balance text-2xl font-semibold tracking-title text-zinc-900 sm:flex-row sm:text-4xl dark:text-zinc-100">
                Ready to learn something new today?
              </h1>

              <p className="text-balance text-sm text-zinc-500 dark:text-zinc-400">
                Everything a developer needs. All in one place.
              </p>

              <button className="mt-4 flex w-full items-center justify-center gap-4 rounded-md border border-zinc-200 bg-zinc-100 px-4 py-3 transition-all hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900">
                <GithubIcon size={20} />
                <span className="text-zinc-500 dark:text-zinc-400">
                  Sign in with GitHub
                </span>
              </button>
            </section>

            <span className="text-sm text-zinc-500 dark:text-zinc-400">
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
          </div>
        </section>
      </div>
    </main>
  );
}

const MasonryLayout = ({ notes }: any) => (
  <>
    <div className="pointer-events-none absolute -top-1 z-10 h-2/4 w-full bg-gradient-to-b from-zinc-50 to-transparent dark:from-zinc-950 dark:to-transparent" />

    <div className="pointer-events-none absolute -bottom-1 z-10 h-2/4 w-full bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-950 dark:to-transparent" />

    <div className="pointer-events-none absolute -left-1 z-10 h-full w-2/4 bg-gradient-to-r from-zinc-50 to-transparent dark:from-zinc-950 dark:to-transparent" />

    <div className="pointer-events-none absolute -right-1 z-10 h-full w-2/4 bg-gradient-to-l from-zinc-50 to-transparent dark:from-zinc-950 dark:to-transparent" />

    <Masonry
      breakpointCols={{
        default: 4,
        1600: 3,
        1440: 2,
        1280: 2,
        1024: 2,
        768: 1,
      }}
      className="group flex w-full flex-1 skew-x-[5deg] scale-110 gap-4"
      columnClassName="flex flex-col gap-4"
      about="Recent notes"
    >
      {Array.from({ length: 32 }, (_, i) => i % notes.length).map(
        (index, i) => {
          const note = notes[index];

          if (!note)
            return (
              <div
                key={i}
                className="flex animate-pulse cursor-pointer flex-col items-start justify-start rounded-md border border-zinc-200 bg-zinc-100 p-4 shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl dark:border-zinc-900 dark:bg-zinc-950"
              >
                <picture className="pointer-events-none mb-4 h-full w-full select-none rounded-md bg-zinc-200 dark:bg-zinc-900">
                  <div className="pointer-events-none aspect-video select-none rounded-md bg-zinc-100 dark:bg-zinc-900" />
                </picture>

                <div className="flex w-full flex-col items-start justify-start gap-2">
                  <span className="h-3 w-1/2 rounded-md bg-zinc-200 font-medium dark:bg-zinc-900" />
                  <span className="h-3 w-1/4 rounded-md bg-zinc-200 text-xs dark:bg-zinc-900" />
                </div>
              </div>
            );

          const { thumbnail, title, description, slug, authors }: any = note;

          return (
            <Link
              key={i}
              href={`/notes/${slug}`}
              className="flex h-fit cursor-pointer items-start rounded-md border border-zinc-200 bg-zinc-100 p-4 shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl dark:border-zinc-900 dark:bg-zinc-950"
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
