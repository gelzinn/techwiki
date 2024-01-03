'use client';

import { Fragment, useEffect, useState } from 'react';

import {
  Link,
  Image,
  useRouter,
  useSearchParams,
  usePathname,
} from '@/infra/next/app';

import { toast } from '@/infra/sonner';

import { Icon } from '@/components/icon';

import { formatTimeDifference } from '@/utils/formatters/timeDifference';
import { subnav } from '@/config/header/subnav';

import { IPost } from '@/@types/post';
import { removeQueryParam } from '@/utils/removeQueryParam';

type ViewType = 'grid' | 'list';

type TabType = (typeof subnav)[number]['tab'];

export default function Notes() {
  const router = useRouter();
  const pathname = usePathname();

  const search = useSearchParams();

  const tab = search.get('tab') as TabType;

  const [loading, setLoading] = useState<boolean>(false);

  const [fetchedPosts, setFetchedPosts] = useState<IPost[]>([]);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [filters, setFilters] = useState<any>({});

  const [view, setView] = useState<ViewType>('grid');
  const [selectedView, setSelectedView] = useState<ViewType>('grid');

  const [selectedTab, setSelectedTab] = useState<TabType | undefined>(
    undefined,
  );

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

    router.push(`/explore?${newQuery.toString()}`);
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
      const width = window.innerWidth;

      if (selectedView === 'list') {
        if (width < 1024) setView('grid');
        else setView('list');
      }
    };

    if (typeof window === 'undefined') return;

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedView]);

  useEffect(() => {
    removeQueryParam('tab');

    const defaultTab = subnav.find((item: any) => item.default);

    if (!defaultTab) return setSelectedTab(subnav[0].tab);
    if (!tab) return setSelectedTab(defaultTab.tab);

    setSelectedTab(tab);
  }, [tab]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await fetch('/api/notes');
        const { data } = await res.json();

        setPosts(data);
        setFetchedPosts(data);
      } catch (error) {
        toast.error('Error fetching posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="mx-auto flex h-auto min-h-screen w-full max-w-screen-full-hd flex-col items-start justify-start p-4">
      <section
        className="mb-8 flex h-fit w-full items-center justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-900"
        aria-label="Subnav and actions"
      >
        <div
          className="flex h-fit w-fit items-center justify-start gap-2"
          aria-label="Subnav"
        >
          {subnav &&
            subnav.map((item: any) => {
              const { title, href, tab } = item;
              const active = selectedTab === tab;

              return (
                <Link
                  key={title}
                  href={href}
                  className={`flex h-fit w-fit items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-100 px-4 py-2 text-zinc-600 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-inherit data-[active=true]:bg-zinc-200 data-[active=true]:text-zinc-600 dark:border-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 disabled:dark:hover:bg-inherit data-[active=true]:dark:bg-zinc-900 data-[active=true]:dark:text-zinc-400 select-none ${
                    active ? 'pointer-events-none' : 'pointer-events-auto'
                  }`}
                  data-active={active}
                >
                  <span className="text-sm">{title}</span>
                </Link>
              );
            })}
        </div>

        <div
          className="hidden h-10 w-fit items-center justify-end gap-2 sm:flex"
          aria-label="Actions"
        >
          <button
            className="flex h-full w-fit items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-100 p-2 text-zinc-600 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-inherit dark:border-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 disabled:dark:hover:bg-inherit"
            disabled
          >
            <Icon name="Filter" className="h-4 w-4" />
            <span className="text-sm">Filters</span>
          </button>

          <div
            className="flex h-full w-fit items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-900 dark:bg-zinc-950 dark:text-zinc-400"
            aria-label="Toggle view"
          >
            <button
              className="flex h-full w-10 items-center justify-center gap-2 bg-zinc-50 p-2 text-zinc-600 hover:bg-zinc-50 data-[active=true]:bg-zinc-100 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 data-[active=true]:dark:bg-zinc-900"
              onClick={() => handleToggleView('grid')}
              data-active={selectedView === 'grid'}
              disabled={view === 'grid'}
            >
              <Icon name="Grid" className="h-4 w-4" />
            </button>

            <button
              className="flex h-full w-10 items-center justify-center gap-2 bg-zinc-50 p-2 text-zinc-600 hover:bg-zinc-50 data-[active=true]:bg-zinc-100 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 data-[active=true]:dark:bg-zinc-900"
              onClick={() => handleToggleView('list')}
              data-active={selectedView === 'list'}
            >
              <Icon name="List" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {!loading && posts && posts.length > 0 ? (
        <>
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
              view === 'grid'
                ? 'grid gap-0 sm:gap-x-4 sm:gap-y-8'
                : 'mx-auto flex max-w-screen-lg flex-col gap-4'
            } grid-cols-1 transition-all duration-300 ease-in-out sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
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
                      className={`flex w-full border-b ${
                        view === 'grid'
                          ? 'flex-col py-8 first-of-type:pt-0 sm:border-transparent sm:py-0'
                          : 'rounded-md border-zinc-200 bg-zinc-100 p-4 pb-14 sm:border dark:border-zinc-900 dark:bg-zinc-1000'
                      } items-start justify-start overflow-hidden transition-all duration-300 ease-in-out`}
                    >
                      <div
                        className={`relative flex flex-col ${
                          view === 'grid' ? 'w-full' : 'w-fit'
                        } items-start justify-start`}
                      >
                        <Link
                          href={`/notes/${slug}`}
                          className={`flex ${
                            view === 'grid' ? 'mb-4 w-full' : 'w-fit'
                          } items-center justify-start gap-4 font-medium dark:border-zinc-900`}
                        >
                          <picture
                            className={`pointer-events-none aspect-video h-full w-full ${
                              view === 'grid'
                                ? 'aspect-w-16 aspect-h-9'
                                : 'aspect-w-16 aspect-h-9 min-w-96 max-w-96'
                            } overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-900`}
                          >
                            {thumbnail ? (
                              <Image
                                src={thumbnail}
                                alt={title}
                                className="pointer-events-none aspect-video w-full select-none bg-zinc-100 blur-xl transition-all duration-300 ease-in-out dark:bg-zinc-900"
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
                              ? 'mb-4 w-full overflow-x-auto'
                              : 'absolute bottom-0 mt-8 translate-y-full flex-wrap pt-4'
                          }`}
                          aria-label="Categories"
                        >
                          {categories && categories.length > 0 && (
                            <div className="relative flex items-center justify-start gap-1.5">
                              {categories.map(
                                (category: any, index: number) => (
                                  <Link
                                    key={index}
                                    href={`/explore?category=${category}`}
                                    className="w-fit text-nowrap rounded-md bg-zinc-200 px-2 py-1 text-xs font-medium uppercase tracking-tight text-zinc-500 hover:bg-zinc-300 hover:text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
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
                        className={`flex w-full flex-1 flex-col items-start justify-start ${
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
                                    href={`/explore?author=${author}`}
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
                              className={`flex h-fit w-full flex-col items-start justify-start gap-1.5`}
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
                          className={`flex h-fit w-full flex-col items-start justify-start gap-1.5`}
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
