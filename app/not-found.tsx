'use client';

import { useLayoutEffect, useState } from 'react';
import { usePathname } from '@/infra/next/app';

export default function NotFound() {
  const pathname = usePathname();

  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    const header = document.querySelector(
      '[aria-label="Application Header"]',
    ) as HTMLElement;

    const footer = document.querySelector(
      '[aria-label="Application Footer"]',
    ) as HTMLElement;

    if (!header || !footer) return;

    const headerHeight = header.getBoundingClientRect().height;
    const footerHeight = footer.getBoundingClientRect().height;

    const height = headerHeight + footerHeight;

    setContentHeight(height);
  }, []);

  return (
    <main
      className="flex flex-col items-center justify-center"
      style={{
        height: `calc(100vh - ${contentHeight}px)`,
      }}
    >
      <section className="flex w-full max-w-md flex-col items-center justify-center px-4 text-center">
        <h1
          className="mb-4 text-center text-5xl sm:text-9xl"
          style={{
            WebkitMaskImage: 'linear-gradient(to top, transparent, black)',
          }}
        >
          404
        </h1>

        <p className="flex flex-wrap items-center justify-center leading-[200%]">
          This page
          <pre className="mx-2 flex items-center justify-center rounded-md bg-rose-500/15 p-1 text-sm text-rose-500">
            <span className="text-rose-600">{pathname}</span>
          </pre>
          was not found.
        </p>

        <p className="mt-4 flex items-center justify-center">
          <a href="/" className="text-blue-600 hover:text-blue-700">
            Go back to home
          </a>
        </p>
      </section>
    </main>
  );
}
