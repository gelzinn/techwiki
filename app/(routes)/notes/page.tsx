import { getNotes } from 'app/lib/mdx';
import { ChevronLeft } from 'lucide-react';

export default async function Notes() {
  const posts = await getNotes();

  return (
    <main className="flex flex-col items-start justify-center w-full max-w-screen-full-hd mx-auto py-8 p-4">
      <h1 className="flex items-center justify-start gap-4 w-full mb-8 font-medium pb-4 border-b border-zinc-200 dark:border-zinc-900">
        <a
          href="/"
          className="flex items-center justify-center gap-2 bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 dark:bg-zinc-950 dark:border-zinc-900 dark:hover:bg-zinc-900 rounded-md p-2"
        >
          <span className="sr-only">Home</span>
          <ChevronLeft className="w-4 h-4" />
        </a>
        <span className="text-3xl">All notes</span>
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 w-full">
        {posts && posts.length > 0 ? (
          Array.from({
            length: 8,
          })
            .reverse()
            .map((_, index) => {
              const post: any = posts[0];

              const {
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
                  className="flex flex-col items-start justify-start w-full"
                >
                  <picture className="w-full mb-4 overflow-hidden rounded-md aspect-video pointer-events-none select-none">
                    <source srcSet={thumbnail} />
                    <source srcSet={thumbnail} />
                    <img
                      src={thumbnail}
                      alt={title}
                      className="aspect-video pointer-events-none select-none"
                    />
                  </picture>

                  <section
                    className="flex flex-wrap items-center justify-start w-full gap-2 mb-4"
                    aria-label="Categories"
                  >
                    {categories &&
                      categories.map((category: any, index: number) => {
                        return (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs font-medium tracking-tight uppercase bg-zinc-100 text-zinc-500 rounded-md dark:bg-zinc-900 dark:text-zinc-400"
                          >
                            {category}
                          </span>
                        );
                      })}
                  </section>

                  <section
                    className="flex flex-col items-start justify-start w-full gap-1 mb-4"
                    aria-label="Title and description"
                  >
                    <strong className="w-full font-medium tracking-tight">
                      {title}
                    </strong>

                    <p className="w-full text-zinc-500 dark:text-zinc-400">
                      {description}
                    </p>
                  </section>

                  <section
                    className="flex flex-wrap items-center justify-start w-full gap-2 mb-4"
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
                              <a
                                key={index}
                                className="flex items-center justify-start gap-1"
                                href={`notes?author=${author}`}
                              >
                                <img
                                  key={index}
                                  src={`https://github.com/${author}.png`}
                                  alt={author}
                                  className="w-6 h-6 rounded-full pointer-events-none select-none"
                                />

                                <span className="text-sm">{author}</span>
                              </a>
                            );
                          case 2:
                            return (
                              <>
                                <a
                                  key={index}
                                  className="flex items-center justify-start gap-1"
                                  href={`notes?author=${author}`}
                                >
                                  <img
                                    key={index}
                                    src={`https://github.com/${author}.png`}
                                    alt={author}
                                    className="w-6 h-6 rounded-full pointer-events-none select-none"
                                  />

                                  <span className="text-sm">{author}</span>
                                </a>

                                {!isLast && (
                                  <span className="text-sm">and</span>
                                )}
                              </>
                            );
                          default:
                          case 3:
                            return (
                              <>
                                <a
                                  key={index}
                                  className="flex items-center justify-start gap-1"
                                  href={`notes?author=${author}`}
                                >
                                  <img
                                    key={index}
                                    src={`https://github.com/${author}.png`}
                                    alt={author}
                                    className="w-6 h-6 rounded-full pointer-events-none select-none"
                                  />

                                  <span className="text-sm">{author}</span>
                                </a>

                                {!isLast && (
                                  <span className="-ml-2 text-sm">,</span>
                                )}

                                {isPenultimate && (
                                  <span className="text-sm">and</span>
                                )}

                                {isLast && (
                                  <span className="-ml-2 text-sm">.</span>
                                )}
                              </>
                            );
                        }
                      })}
                  </section>

                  <a
                    href={`/notes/${slug}`}
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Read more →
                  </a>
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
