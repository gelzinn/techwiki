'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Fragment, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { ArrowRight, ChevronLeft, X } from 'lucide-react';

import { formatTimeDifference } from '@/lib/formatters/timeDifference';

import { IPost } from '@/@types/post';

export default function Notes() {
  const router = useRouter();
  const search = useSearchParams();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [filters, setFilters] = useState<any>({});

  const handleRemoveFilter = (filter: string, value: string) => {
    setFilters((prevFilters: any) => {
      const newFilters = { ...prevFilters };

      if (newFilters[filter]) {
        const newFilter = newFilters[filter]
          .split(',')
          .filter((f: string) => f !== value)
          .join(',');

        if (newFilter) newFilters[filter] = newFilter;
        else delete newFilters[filter];
      }

      return newFilters;
    });

    const newQuery = new URLSearchParams(search.toString());

    if (newQuery.get(filter)) {
      const newFilter = newQuery
        .get(filter)
        ?.split(',')
        .filter((f: string) => f !== value)
        .join(',');

      if (newFilter) newQuery.set(filter, newFilter);
      else newQuery.delete(filter);
    }

    router.push(`/notes?${newQuery.toString()}`);
  };

  useEffect(() => {
    setFilters({
      author: search.get('author') || '',
      category: search.get('category') || '',
    });

    const getNotesData = async () => {
      const { data } = await fetch(`/api/notes?${search.toString()}`)
        .then((res) => res.json())
        .catch((err) => console.error(err));

      if (data) setPosts(data);
      else setPosts([]);
    };

    getNotesData();
  }, [search]);

  return (
    <main className="mx-auto flex h-auto min-h-screen w-full max-w-screen-full-hd flex-col items-start justify-start p-4 py-8">
      <h1 className="mb-8 flex h-16 w-full items-center justify-start gap-4 border-b border-zinc-200 pb-4 font-medium dark:border-zinc-900">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-100 p-2 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <span className="sr-only">Home</span>
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <span className="text-xl sm:text-3xl">All notes</span>
      </h1>

      {filters &&
        (filters.author || filters.category) &&
        Object.keys(filters).length > 0 && (
          <section
            className="mb-8 flex w-full items-center justify-start gap-2 pb-4"
            aria-label="Filters"
          >
            <strong
              className="text-sm font-semibold text-zinc-500 dark:text-zinc-400"
              aria-label="Filtering by"
            >
              Filtering by:{' '}
            </strong>

            {filters.author &&
              filters.author.split(',').map((author: string, index: number) => (
                <button
                  key={index}
                  className="flex items-center justify-start rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium tracking-tight text-zinc-500 hover:bg-zinc-200 hover:text-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                  onClick={() => handleRemoveFilter('author', author)}
                >
                  <span className="text-sm">
                    <strong>author:</strong> {author}
                  </span>
                  <span className="sr-only">Remove filter</span>

                  <X className="ml-1 h-4 w-4" />
                </button>
              ))}

            {filters.category &&
              filters.category
                .split(',')
                .map((category: string, index: number) => (
                  <button
                    key={index}
                    className="flex items-center justify-start rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium tracking-tight text-zinc-500 hover:bg-zinc-200 hover:text-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                    onClick={() => handleRemoveFilter('category', category)}
                  >
                    <span className="text-sm">{category}</span>
                    <span className="sr-only">Remove filter</span>

                    <X className="ml-1 h-4 w-4" />
                  </button>
                ))}
          </section>
        )}

      <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {posts && posts.length > 0 ? (
          posts
            .sort((a: IPost, b: IPost) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime(); // Sort from newest to oldest
            })
            .map((post: IPost, index: number) => {
              const {
                date,
                slug,
                title,
                description,
                thumbnail,
                categories,
                authors,
              } = post;

              return (
                <li
                  key={index}
                  className="flex w-full flex-col items-start justify-start overflow-hidden"
                >
                  <Link
                    href={`/notes/${slug}`}
                    className="mb-4 flex w-full items-center justify-start gap-4 font-medium dark:border-zinc-900"
                  >
                    <picture className="pointer-events-none aspect-video h-full w-full overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-900">
                      {thumbnail ? (
                        <Image
                          src={thumbnail}
                          alt={title}
                          className="pointer-events-none aspect-video w-full select-none bg-zinc-100 object-cover dark:bg-zinc-900"
                          style={{ objectFit: 'cover' }}
                          width={640}
                          height={360}
                          quality={50}
                          priority
                          loading="eager"
                          about={`Thumbnail of ${title}`}
                        />
                      ) : (
                        <div className="pointer-events-none aspect-video select-none rounded-md bg-zinc-100 dark:bg-zinc-900" />
                      )}
                    </picture>
                  </Link>

                  <section
                    className="scrollbar-none mb-4 flex w-full items-center justify-start gap-1.5 overflow-x-auto"
                    aria-label="Categories"
                  >
                    {categories && categories.length > 0 && (
                      <div className="relative flex items-center justify-start gap-1.5">
                        {categories.map((category: any, index: number) => (
                          <Link
                            key={index}
                            href={`/notes?category=${category}`}
                            className="w-fit text-nowrap rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium uppercase tracking-tight text-zinc-500 hover:bg-zinc-200 hover:text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    )}
                  </section>

                  <div
                    className="flex w-full flex-col items-start justify-start"
                    aria-label="Title, description and authors"
                  >
                    <section
                      className="flex w-full flex-col items-start justify-start gap-1"
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
                              className="flex items-center justify-start hover:underline"
                              href={`/notes?author=${author}`}
                            >
                              <Image
                                src={`https://github.com/${author}.png`}
                                alt={author}
                                className="pointer-events-none mr-1 h-6 w-6 select-none rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-900"
                                width={24}
                                height={24}
                                loading="lazy"
                                about={`Avatar of ${author}`}
                              />

                              <span className="text-sm">{author}</span>
                            </Link>

                            {index === authors.length - 2 && (
                              <span className="pointer-events-none text-sm text-zinc-400">
                                {' '}
                                and
                              </span>
                            )}

                            {index < authors.length - 2 && (
                              <span className="pointer-events-none text-sm text-zinc-400">
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
                  </div>

                  <footer
                    className="flex w-full flex-col items-start justify-start gap-1.5"
                    aria-label="Read more and published on"
                  >
                    <Link
                      href={`/notes/${slug}`}
                      className="group flex items-center justify-start gap-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Read more <ArrowRight className="h-4 w-4" />
                    </Link>

                    <span
                      className="text-sm text-zinc-500 dark:text-zinc-400"
                      aria-label="Published on"
                    >
                      {new Date(date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}

                      {' • '}

                      {formatTimeDifference(new Date(date))}
                    </span>
                  </footer>
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
