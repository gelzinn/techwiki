import Link from 'next/link';

import { getNote } from '../../../lib/mdx';

import { ChevronLeft } from 'lucide-react';
import MDX from 'app/components/mdx';

const getNoteContent = async (slug: string) => {
  const { meta, content } = await getNote(slug);
  return { meta, content };
};

export default async function NotePage({
  params,
}: {
  params: { slug: string };
}) {
  const { meta, content }: any = await getNoteContent(params.slug);
  const { authors, categories, description, thumbnail, title, date } = meta;

  return (
    <main className="mx-auto flex w-full max-w-screen-full-hd flex-col items-start justify-center p-4 py-8 text-justify">
      <section
        className="mx-auto mb-8 flex h-16 w-full max-w-3xl items-center justify-start gap-4 border-b border-zinc-200 pb-4 text-sm dark:border-zinc-900"
        aria-label="Breadcrumb"
      >
        <Link
          href="/notes"
          className="flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-100 p-2 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <span className="sr-only">Home</span>
          <ChevronLeft className="h-4 w-4" />
        </Link>

        <Link
          href="/notes"
          className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
          aria-label="All notes"
        >
          All notes
        </Link>

        <span
          className="pointer-events-none select-none text-sm text-zinc-500 dark:text-zinc-400"
          aria-hidden="true"
        >
          /
        </span>

        <span
          className="pointer-events-none select-none text-sm text-zinc-500 dark:text-zinc-400"
          aria-label={title}
        >
          {title}
        </span>
      </section>

      <section
        className="mx-auto flex w-full max-w-3xl flex-col items-start justify-start"
        aria-label="Note"
      >
        {thumbnail && (
          <picture className="mx-auto mb-8 aspect-video select-none overflow-hidden rounded-md">
            <source srcSet={thumbnail} />
            <source srcSet={thumbnail} />
            <img
              src={thumbnail}
              alt={title}
              className="pointer-events-none aspect-video w-full max-w-3xl select-none"
            />
          </picture>
        )}

        <article className="flex w-full flex-col items-start justify-start gap-4">
          <section
            className="mb-4 flex w-full flex-col items-start justify-start gap-1"
            aria-label="Title and description"
          >
            <h2 className="text-left text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
              {title}
            </h2>

            <p className="text-left text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </section>

          <section
            className="mb-4 flex w-full flex-wrap items-center justify-start gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-900"
            aria-label="Authors"
          >
            {authors &&
              authors.map((author: any, index: number) => {
                const quantity = authors.length;

                const isLast = index === quantity - 1;
                const isPenultimate = index === quantity - 2;

                switch (quantity) {
                  case 1:
                    return (
                      <Link
                        key={index}
                        className="flex items-center justify-start gap-2"
                        href={`/notes?author=${author}`}
                      >
                        <img
                          key={index}
                          src={`https://github.com/${author}.png`}
                          alt={author}
                          className="pointer-events-none h-8 w-8 select-none rounded-full"
                        />

                        <span className="text-sm">{author}</span>
                      </Link>
                    );
                  case 2:
                    return (
                      <>
                        <Link
                          key={index}
                          className="flex items-center justify-start gap-1"
                          href={`notes?author=${author}`}
                        >
                          <img
                            key={index}
                            src={`https://github.com/${author}.png`}
                            alt={author}
                            className="pointer-events-none h-6 w-6 select-none rounded-full"
                          />

                          <span className="text-sm">{author}</span>
                        </Link>

                        {!isLast && <span className="text-sm">and</span>}
                      </>
                    );
                  default:
                  case 3:
                    return (
                      <>
                        <Link
                          key={index}
                          className="flex items-center justify-start gap-1"
                          href={`notes?author=${author}`}
                        >
                          <img
                            key={index}
                            src={`https://github.com/${author}.png`}
                            alt={author}
                            className="pointer-events-none h-6 w-6 select-none rounded-full"
                          />

                          <span className="text-sm">{author}</span>
                        </Link>

                        {!isLast && <span className="-ml-2 text-sm">,</span>}

                        {isPenultimate && <span className="text-sm">and</span>}

                        {isLast && <span className="-ml-2 text-sm">.</span>}
                      </>
                    );
                }
              })}
          </section>

          <section
            className="mb-4 flex w-full flex-col items-start justify-start gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-900"
            aria-label="Content"
          >
            <MDX>{content}</MDX>
          </section>

          <footer className="grid w-full grid-cols-1 gap-4 sm:mb-4 sm:grid-cols-2">
            <section
              className="mb-4 flex w-full flex-wrap items-start justify-center gap-2 sm:justify-start"
              aria-label="Categories"
            >
              {categories &&
                categories.map((category: any, index: number) => {
                  return (
                    <Link
                      key={index}
                      href={`/notes?category=${category}`}
                      className="inline-block rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium uppercase tracking-tight text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400"
                    >
                      {category}
                    </Link>
                  );
                })}
            </section>

            <section
              className="mb-4 flex w-full flex-wrap items-start justify-center gap-2 sm:justify-end"
              aria-label="Date"
            >
              <span
                className="text-right text-sm text-zinc-500 dark:text-zinc-400"
                aria-label="Last updated"
              >
                Posted on{' '}
                <time
                  dateTime={date}
                  className="text-left text-zinc-500 dark:text-zinc-400"
                >
                  {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </time>
              </span>
            </section>
          </footer>
        </article>
      </section>
    </main>
  );
}
