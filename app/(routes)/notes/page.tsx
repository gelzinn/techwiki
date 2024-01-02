'use client';

import { Fragment, useEffect, useState } from 'react';

import {
  Link,
  Image,
  useRouter,
  useSearchParams,
  usePathname,
} from '@/infra/next/app';

import { Icon } from '@/components/icon';

import { formatTimeDifference } from '@/lib/formatters/timeDifference';
import { subnav } from '@/config/header/subnav';

import { IPost } from '@/@types/post';

type ViewType = 'grid' | 'list';

export default function Notes() {
  const router = useRouter();
  const pathname = usePathname();

  const search = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);

  const [fetchedPosts, setFetchedPosts] = useState<IPost[]>([]);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [filters, setFilters] = useState<any>({});

  const [selectedView, setSelectedView] = useState<ViewType>('grid');
  const [view, setView] = useState<ViewType>('grid');

  const handleRemoveFilter = (filter: string, value: string) => {
    const newFilters = { ...filters };

    if (newFilters[filter]) {
      const newFilter = newFilters[filter]
        .split(',')
        .filter((f: string) => f !== value)
        .join(',');

      if (newFilter) newFilters[filter] = newFilter;
      else delete newFilters[filter];
    }

    setFilters(newFilters);

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

  const handleToggleView = (newView?: ViewType) => {
    if (!newView) {
      if (view === 'grid') setSelectedView('list');
      else setSelectedView('grid');
    } else {
      if (newView === view) return;

      if (newView === 'grid') setSelectedView('grid');
      else setSelectedView('list');
    }
  };

  useEffect(() => {
    const author = search.get('author') || '';
    const category = search.get('category') || '';

    if (!author && !category) return setPosts(fetchedPosts);
  }, [search, fetchedPosts, filters]);

  useEffect(() => {
    if (!search) return setPosts(fetchedPosts);

    const author = search.get('author') || '';
    const category = search.get('category') || '';

    if (!author && !category) return setPosts(fetchedPosts);

    setFilters((prevFilters: any) => ({
      ...prevFilters,
      author,
      category,
    }));

    const authors = author.split(',') || [];
    const categories = category.split(',') || [];

    const filteredPosts = fetchedPosts.filter((post: IPost) => {
      if (authors && authors.length > 0) {
        const postAuthors = post.authors || [];

        for (const author of authors) {
          if (postAuthors.includes(author)) return true;
        }
      }

      if (categories && categories.length > 0) {
        const postCategories = post.categories || [];

        for (const category of categories) {
          if (postCategories.includes(category)) return true;
        }
      }

      return false;
    });

    setPosts(filteredPosts);
  }, [search, fetchedPosts]);

  useEffect(() => {
    if (!selectedView) return;

    setView(selectedView);
  }, [selectedView]);

  useEffect(() => {
    const handleResize = () => {
      if (selectedView === 'list') {
        if (window.innerWidth < 1024) setView('grid');
        else setView('list');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await fetch('/api/notes');
        const { data } = await res.json();

        setPosts(data);
        setFetchedPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="mx-auto flex h-auto min-h-screen w-full max-w-screen-full-hd flex-col items-start justify-start p-4">
      <section
        className="flex items-center justify-between gap-2 w-full h-fit mb-4"
        aria-label="Subnav and actions"
      >
        <div
          className="flex items-center justify-start gap-4 w-fit h-fit"
          aria-label="Subnav"
        >
          {subnav &&
            subnav.map((item: any) => {
              const { title, href } = item;
              const active = !!pathname === href;

              return (
                <Link
                  key={title}
                  href={href}
                  className="relative flex items-center justify-center w-fit h-fit gap-2 rounded-md text-zinc-600 dark:text-zinc-400 px-1 py-2"
                >
                  <span className="text-sm">{title}</span>

                  <div
                    className="absolute opacity-0 data-[active=true]:opacity-100 bottom-0 left-0 right-0 h-px rounded-full bg-zinc-600 dark:bg-zinc-400 transition-all duration-300"
                    data-active={active}
                  />
                </Link>
              );
            })}
        </div>

        <div
          className="hidden sm:flex items-center justify-end gap-2 w-fit h-10"
          aria-label="Actions"
        >
          <button className="flex items-center justify-center w-fit h-full gap-2 rounded-md border border-zinc-200 bg-zinc-100 p-2 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
            <Icon name="Filter" className="h-4 w-4" />
            <span className="text-sm">Filters</span>
          </button>

          <div
            className="flex items-center justify-center w-fit h-full rounded-md border border-zinc-200 bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 overflow-hidden"
            aria-label="Toggle view"
          >
            <button
              className="flex items-center justify-center w-10 h-full gap-2 bg-zinc-100 p-2 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 data-[active=true]:bg-zinc-200 data-[active=true]:dark:bg-zinc-900"
              onClick={() => handleToggleView('grid')}
              data-active={selectedView === 'grid'}
            >
              <Icon name="Grid" className="h-4 w-4" />
            </button>

            <button
              className="flex items-center justify-center w-10 h-full gap-2 bg-zinc-100 p-2 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 data-[active=true]:bg-zinc-200 data-[active=true]:dark:bg-zinc-900"
              onClick={() => handleToggleView('list')}
              data-active={selectedView === 'list'}
            >
              <Icon name="List" className="h-4 w-4" />
            </button>
          </div>

          <button
            className="flex items-center justify-center w-fit h-full gap-2 rounded-md border border-zinc-200 bg-zinc-100 p-2 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-inherit"
            disabled
          >
            <Icon name="Plus" className="h-4 w-4" />
            <span className="text-sm">New Note</span>
          </button>
        </div>
      </section>

      {!loading && posts && posts.length > 0 ? (
        <>
          <h1 className="mb-8 flex h-16 w-full items-center justify-start gap-4 border-b border-zinc-200 pb-4 font-medium dark:border-zinc-900">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-100 p-2 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            >
              <span className="sr-only">Home</span>
              <Icon name="ChevronLeft" className="h-4 w-4" />
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
                  filters.author
                    .split(',')
                    .map((author: string, index: number) => (
                      <button
                        key={index}
                        className="flex items-center justify-start rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium tracking-tight text-zinc-500 hover:bg-zinc-200 hover:text-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                        onClick={() => handleRemoveFilter('author', author)}
                      >
                        <span className="text-sm">
                          <strong>author:</strong> {author}
                        </span>
                        <span className="sr-only">Remove filter</span>

                        <Icon name="X" className="ml-1 h-4 w-4" />
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
                        <span className="text-sm">category: {category}</span>
                        <span className="sr-only">Remove filter</span>

                        <Icon name="X" className="ml-1 h-4 w-4" />
                      </button>
                    ))}
              </section>
            )}

          <ul
            className={`${
              view === 'grid' ? 'grid gap-x-4 gap-y-8' : 'flex flex-col gap-0'
            } w-full grid-cols-1 divide-y divide-zinc-200 sm:grid-cols-2 sm:divide-y-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 dark:divide-zinc-900 transition-all duration-500 ease-in-out`}
          >
            {posts.length > 0 ? (
              posts
                .sort((a: IPost, b: IPost) => {
                  return (
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  ); // Sort from newest to oldest
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
                      className={`flex w-full ${
                        view === 'grid'
                          ? 'flex-col pb-0 sm:py-0 pt-8'
                          : 'pb-12 pt-4'
                      } items-start justify-start overflow-hidden first-of-type:pt-0 transition-all duration-500 ease-in-out`}
                    >
                      <div
                        className={`relative flex flex-col ${
                          view === 'grid' ? 'w-full' : 'w-fit'
                        } items-start justify-start`}
                      >
                        <Link
                          href={`/notes/${slug}`}
                          className={`flex ${
                            view === 'grid' ? 'w-full mb-4' : 'w-fit'
                          } items-center justify-start gap-4 font-medium dark:border-zinc-900`}
                        >
                          <picture
                            className={`pointer-events-none aspect-video h-full w-full ${
                              view === 'grid'
                                ? 'aspect-w-16 aspect-h-9'
                                : 'min-w-96 max-w-96 aspect-w-16 aspect-h-9'
                            } overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-900`}
                          >
                            {thumbnail ? (
                              <Image
                                src={thumbnail}
                                alt={title}
                                className="pointer-events-none aspect-video w-full select-none bg-zinc-100 blur-xl transition-all duration-500 ease-in-out dark:bg-zinc-900"
                                style={{ objectFit: 'cover' }}
                                width={640}
                                height={360}
                                quality={20}
                                loading="lazy"
                                onLoadStart={(e) => {
                                  const image = e.target as HTMLImageElement;
                                  image.classList.add('blur-xl');
                                }}
                                onLoad={(e) => {
                                  const image = e.target as HTMLImageElement;
                                  image.classList.remove('blur-xl');
                                }}
                                about={`Thumbnail of ${title}`}
                              />
                            ) : (
                              <div className="pointer-events-none aspect-video select-none rounded-md bg-zinc-100 dark:bg-zinc-900" />
                            )}
                          </picture>
                        </Link>

                        <section
                          className={`scrollbar-none flex items-center justify-start gap-1.5 ${
                            view === 'grid'
                              ? 'w-full mb-4 overflow-x-auto'
                              : 'absolute bottom-0 translate-y-full flex-wrap pt-4 mt-4'
                          }`}
                          aria-label="Categories"
                        >
                          {categories && categories.length > 0 && (
                            <div className="relative flex items-center justify-start gap-1.5">
                              {categories.map(
                                (category: any, index: number) => (
                                  <Link
                                    key={index}
                                    href={`/notes?category=${category}`}
                                    className="w-fit text-nowrap rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium uppercase tracking-tight text-zinc-500 hover:bg-zinc-200 hover:text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                                  >
                                    {category}
                                  </Link>
                                ),
                              )}
                            </div>
                          )}
                        </section>
                      </div>

                      <div
                        className={`flex flex-1 w-full flex-col items-start justify-start ${
                          view === 'grid' ? '' : 'ml-4'
                        }`}
                        aria-label="Title, description and authors"
                      >
                        <>
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

                          {view === 'list' && (
                            <footer
                              className={`flex w-full h-fit flex-col items-start justify-start gap-1.5`}
                              aria-label="Read more and published on"
                            >
                              <Link
                                href={`/notes/${slug}`}
                                className="group flex items-center justify-start gap-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                Read more{' '}
                                <Icon name="ArrowRight" className="h-4 w-4" />
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
                          )}
                        </>
                      </div>

                      {view === 'grid' && (
                        <footer
                          className={`flex w-full h-fit flex-col items-start justify-start gap-1.5`}
                          aria-label="Read more and published on"
                        >
                          <Link
                            href={`/notes/${slug}`}
                            className="group flex items-center justify-start gap-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Read more{' '}
                            <Icon name="ArrowRight" className="h-4 w-4" />
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
                      )}
                    </li>
                  );
                })
            ) : (
              <div
                className="flex w-full flex-col items-start justify-start gap-4"
                aria-label="No notes found"
              >
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  No notes found.
                </span>
              </div>
            )}
          </ul>
        </>
      ) : (
        <>
          <div
            className="pointer-events-none mb-8 flex h-16 w-full animate-pulse select-none items-center justify-start gap-4 border-b border-zinc-200 pb-4 font-medium dark:border-zinc-900"
            aria-label="Loading notes"
          >
            <div className="h-10 min-h-10 w-10 min-w-10 rounded-md bg-zinc-100 dark:bg-zinc-900" />
            <div className="h-10 min-h-10 w-full max-w-md rounded-md bg-zinc-100 dark:bg-zinc-900" />
          </div>

          <div
            aria-label="Loading filters"
            className="pointer-events-none mb-8 flex h-screen w-full animate-pulse select-none items-start justify-start gap-2 overflow-hidden"
            style={{
              WebkitMaskImage: 'linear-gradient(to top, transparent, black)',
            }}
          >
            <ul
              className="grid w-full grid-cols-1 gap-4 divide-y divide-zinc-200 sm:grid-cols-2 sm:divide-y-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 dark:divide-zinc-900"
              aria-label="Loading notes"
            >
              {Array.from({ length: 30 }).map((_, index: number) => (
                <li
                  key={index}
                  className="flex aspect-video h-fit min-h-48 w-full flex-col items-start justify-start overflow-hidden rounded-md bg-zinc-100 pb-4 pt-8 first-of-type:pt-0 sm:py-0 dark:bg-zinc-900"
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </main>
  );
}
