'use client';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sticky top-0 z-50 mx-auto flex items-center justify-center overflow-hidden border-t border-zinc-200 bg-zinc-100 text-black dark:border-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="relative flex w-full max-w-screen-full-hd items-center justify-center p-4 sm:h-16">
        <span className="flex flex-col items-center justify-center text-center text-xs text-zinc-500 sm:flex-row sm:text-sm dark:text-zinc-400">
          <p className="ml-1 text-zinc-600 dark:text-zinc-400">
            {currentYear} © TechWiki - All rights reserved.
          </p>
          <p className="ml-1 text-zinc-600 dark:text-zinc-400">
            Want to contribute? Check out our
            <a
              target="_blank"
              href="https://github.com/gelzinn/techwiki/wiki"
              className="ml-1 text-zinc-600 hover:underline dark:text-zinc-400"
              rel="noreferrer"
            >
              GitHub Wiki
            </a>
            .
          </p>
        </span>
      </div>
    </footer>
  );
};
