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
      className="mx-auto grid h-auto w-full max-w-screen-full-hd grid-cols-1 lg:grid-cols-[minmax(250px,_1fr),3fr,minmax(250px,_1fr)]"
      style={{
        minHeight: 'calc(100vh - 65px)',
      }}
    >
      <aside className="hidden flex-1 text-zinc-500 lg:flex dark:text-zinc-400">
        <nav className="flex flex-col items-start justify-start gap-8 p-8">
          <ul className="flex w-full flex-col items-start justify-start gap-2">
            <span className="w-full text-sm font-bold uppercase">
              Getting Started
            </span>
            <ul className="ml-4 flex w-full flex-col items-start justify-center gap-1">
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

          <ul className="flex w-full flex-col items-start justify-center gap-2">
            <span className="w-full text-sm font-bold uppercase">
              Community
            </span>

            <ul className="ml-4 flex h-full w-full flex-col items-start justify-center gap-1">
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

      <section className="flex flex-col items-center justify-start border-zinc-200 px-4 py-8 sm:p-8 lg:border-x dark:border-zinc-900">
        <div className="flex w-full flex-col items-center justify-start gap-4 text-zinc-950 dark:text-zinc-50">
          <span
            className="flex w-fit items-center justify-center gap-4 rounded-md border border-emerald-500 bg-emerald-100 px-4 py-2 text-center text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/25 dark:text-zinc-50"
            role="alert"
          >
            <span className="pointer-events-none select-none text-emerald-500">
              ✦
            </span>
            <p>
              <strong className="font-medium">Announcement:</strong> TechWiki is
              now open source!
            </p>
            <span className="pointer-events-none select-none text-emerald-500">
              ✦
            </span>
          </span>

          <div
            className="my-8 flex flex-col items-center justify-center gap-1"
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
            <div className="grid w-full grid-cols-1 gap-4 py-8 md:grid-cols-2">
              {cards.map((card, index) => {
                const { title, description, href } = card;

                return (
                  <a
                    key={index}
                    href={href}
                    className="group flex w-full items-center justify-between gap-2 rounded-md border border-zinc-200 bg-zinc-100 p-4 text-sm text-white hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900"
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

                    <ChevronRight className="hidden h-6 w-6 text-zinc-500 transition-opacity duration-200 group-hover:opacity-0 sm:block dark:text-zinc-400" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <aside className="absolute flex flex-1 text-zinc-500 md:relative dark:text-zinc-400" />
    </main>
  );
}
