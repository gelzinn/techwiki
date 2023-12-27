import { ChevronLeft } from 'lucide-react';
import { getNote } from '../../../lib/mdx';
import Link from 'next/link';

const getNoteContent = async (slug: string) => {
  const { meta, content } = await getNote(slug);
  return { meta, content };
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { meta } = await getNoteContent(params.slug);
  return { meta };
}

export default async function NotePage({
  params,
}: {
  params: { slug: string };
}) {
  const { meta, content }: any = await getNoteContent(params.slug);

  const { authors, categories, description, thumbnail, title } = meta;

  return (
    <main className="mx-auto flex w-full max-w-screen-full-hd flex-col items-start justify-center p-4 py-8 text-justify">
      <h1 className="relative mb-8 flex w-full items-center justify-start lg:justify-center gap-4 border-b border-zinc-200 pb-4 font-medium dark:border-zinc-900">
        <Link
          href="/notes"
          className="lg:absolute lg:left-0 flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-100 p-2 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <span className="sr-only">Notes</span>
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <span className="text-center text-xl sm:text-3xl">{title}</span>
      </h1>

      <section
        className="flex w-full max-w-3xl flex-col items-start justify-start gap-4 mx-auto"
        aria-label="Note"
      >
        <picture
          className="mb-4 aspect-video select-none overflow-hidden rounded-md mx-auto"
          aria-label="Thumbnail"
        >
          <source srcSet={thumbnail} />
          <source srcSet={thumbnail} />
          <img
            src={thumbnail}
            alt={title}
            className="w-full max-w-3xl pointer-events-none aspect-video select-none"
          />
        </picture>

        <article className="flex w-full flex-col items-start justify-start gap-4">
          <section
            className="mb-4 flex w-full flex-wrap items-center justify-start gap-2"
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
            className="mb-4 flex w-full flex-col items-start justify-start gap-1"
            aria-label="Title and description"
          >
            <h2 className="text-left text-2xl sm:text-4xl font-bold leading-tight tracking-tight">
              {title}
            </h2>

            <p className="text-left text-lg sm:text-xl text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </section>

          <section
            className="mb-4 flex w-full flex-wrap items-center justify-start gap-2"
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

          <section className="mb-4 flex w-full flex-col items-start justify-start gap-4">
            {content}
          </section>
        </article>
      </section>
    </main>
  );
}
