import { ChevronRight } from 'lucide-react';
import { CSSProperties } from 'react';
import { TechWikiLogo } from './components/logo';

export default function Homepage() {
  const cards = [
    {
      title: 'Getting Started',
      description:
        'Learn more about TechWiki and how you can contribute to it.',
      href: '/docs/getting-started/what-is-techwiki',
    },
    {
      title: 'Community',
      description:
        'Learn more about TechWiki and how you can contribute to it.',
      href: '/docs/community/code-of-conduct',
    },
    {
      title: 'Contributors',
      description:
        'Learn more about TechWiki and how you can contribute to it.',
      href: '/docs/community/contributors',
    },
    {
      title: 'Code of Conduct',
      description:
        'Learn more about TechWiki and how you can contribute to it.',
      href: '/docs/community/code-of-conduct',
    },
  ];

  return (
    <main
      className="grid grid-cols-1 lg:grid-cols-[minmax(250px,_1fr),3fr,minmax(250px,_1fr)] w-full max-w-screen-full-hd mx-auto h-auto"
      style={{
        minHeight: 'calc(100vh - 65px)',
      }}
    >
      <aside className="hidden lg:flex flex-1 text-zinc-500 dark:text-zinc-400">
        <nav className="flex flex-col items-start justify-start p-8 gap-8">
          <ul className="flex flex-col items-start justify-start w-full gap-2">
            <span className="w-full uppercase font-bold text-sm">
              Getting Started
            </span>
            <ul className="flex flex-col items-start justify-center w-full gap-1 ml-4">
              <li>
                <a href="/docs/getting-started/what-is-techwiki">
                  What is TechWiki?
                </a>
              </li>

              <li>
                <a href="/docs/getting-started/what-is-techwiki">
                  How to contribute
                </a>
              </li>
            </ul>
          </ul>

          <ul className="flex flex-col items-start justify-center w-full gap-2">
            <span className="w-full uppercase font-bold text-sm">
              Community
            </span>

            <ul className="flex flex-col items-start justify-center w-full h-full gap-1 ml-4">
              <li>
                <a href="/docs/community/code-of-conduct">Code of Conduct</a>
              </li>

              <li>
                <a href="/docs/community/contributors">Contributors</a>
              </li>
            </ul>
          </ul>
        </nav>
      </aside>

      <section className="flex flex-col items-center justify-start px-4 py-8 sm:p-8 lg:border-r lg:border-l border-zinc-200 dark:border-zinc-900">
        <div className="flex flex-col items-center justify-start w-full gap-4 text-zinc-950 dark:text-zinc-50">
          <span
            className="flex items-center justify-center gap-4 w-fit px-4 py-2 text-sm text-center bg-emerald-100 dark:bg-emerald-950 dark:bg-opacity-50 border border-emerald-500 dark:border-emerald-800 rounded-md text-emerald-800 dark:text-zinc-50"
            role="alert"
          >
            <span className="text-emerald-500 pointer-events-none select-none">
              ✦
            </span>
            <p>
              <strong className="font-medium">Announcement:</strong> TechWiki is
              now open source!
            </p>
            <span className="text-emerald-500 pointer-events-none select-none">
              ✦
            </span>
          </span>

          <div
            className="flex flex-col items-center justify-center gap-1 my-8"
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
          </div>

          {cards && cards.length > 0 && (
            <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2 py-8">
              {cards.map((card, index) => {
                const { title, description, href } = card;

                return (
                  <a
                    key={index}
                    href={href}
                    className="group flex items-center justify-between w-full gap-2 p-4 text-sm text-white bg-zinc-100 dark:bg-zinc-950 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-900"
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

                    <ChevronRight className="hidden sm:block group-hover:opacity-0 text-zinc-500 dark:text-zinc-400 w-6 h-6 transition-opacity duration-200" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <aside className="absolute md:relative flex flex-1 text-zinc-500 dark:text-zinc-400" />
    </main>
  );
}
