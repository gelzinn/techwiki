import Link from 'next/link';

import { Fragment } from 'react';

import { getNotes } from 'app/lib/mdx';
import { ChevronLeft } from 'lucide-react';

export default async function Notes() {
  const posts = await getNotes();

  return (
    <main className="mx-auto flex w-full max-w-screen-full-hd flex-col items-start justify-center p-4 py-8">
      <h1 className="mb-8 flex h-16 w-full items-center justify-start gap-4 border-b border-zinc-200 pb-4 font-medium dark:border-zinc-900">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-100 p-2 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <span className="sr-only">Home</span>
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <span className="text-3xl">All notes</span>
      </h1>

      <ul className="grid w-full grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts && posts.length > 0 ? (
          posts.map((post: any, index: number) => {
            const { slug, title, description, thumbnail, categories, authors } =
              post;

            return (
              <li
                key={index}
                className="flex w-full flex-col items-start justify-start"
              >
                <Link
                  href={`/notes/${slug}`}
                  className="flex items-center justify-start gap-4 font-medium dark:border-zinc-900"
                >
                  <picture className="pointer-events-none mb-4 aspect-video w-full overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={title}
                        className="pointer-events-none aspect-video select-none rounded-md bg-zinc-100 dark:bg-zinc-900"
                      />
                    ) : (
                      <div className="pointer-events-none aspect-video select-none rounded-md bg-zinc-100 dark:bg-zinc-900" />
                    )}
                  </picture>
                </Link>

                <section
                  className="mb-4 w-full flex items-center justify-start gap-1.5 overflow-x-auto scrollbar-none"
                  aria-label="Categories"
                >
                  {categories && categories.length > 0 && (
                    <div className="relative flex items-center justify-start gap-1.5">
                      {categories.map((category: any, index: number) => (
                        <Link
                          key={index}
                          href={`/notes?category=${category}`}
                          className="w-fit rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium uppercase tracking-tight text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400 text-nowrap"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}
                </section>

                <section
                  className="flex w-full flex-1 flex-col items-start justify-start gap-1"
                  aria-label="Title and description"
                >
                  <strong className="w-full font-medium tracking-tight">
                    {title}
                  </strong>

                  <p className="h-full w-full text-sm text-zinc-500 dark:text-zinc-400">
                    {description}
                  </p>
                </section>

                <section
                  className="my-4 flex w-full flex-wrap items-center justify-start gap-1.5"
                  aria-label="Authors"
                >
                  {authors && authors.length > 0 ? (
                    authors.map((author: string, index: number) => (
                      <Fragment key={index}>
                        <Link
                          className="flex items-center justify-start"
                          href={`/notes?author=${author}`}
                        >
                          <img
                            src={`https://github.com/${author}.png`}
                            alt={author}
                            className="pointer-events-none h-6 w-6 select-none rounded-full mr-1"
                          />

                          <span className="text-sm">{author}</span>
                        </Link>

                        {index === authors.length - 2 && (
                          <span className="text-sm text-zinc-400 pointer-events-none">
                            {' '}
                            and
                          </span>
                        )}

                        {index < authors.length - 2 && (
                          <span className="text-sm text-zinc-400 pointer-events-none">
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

                <Link
                  href={`/notes/${slug}`}
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Read more →
                </Link>
              </li>
            );
          })
        ) : (
          <li>No notes yet.</li>
        )}
      </ul>
    </main>
  );
}
