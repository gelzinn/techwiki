'use client';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sticky top-0 z-50 mx-auto flex items-center justify-center overflow-hidden border-t border-zinc-200 bg-zinc-100 text-black dark:border-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="relative flex h-16 w-full max-w-screen-full-hd items-center justify-center p-4">
        <span className="flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400 text-center">
          {currentYear} © TechWiki - All rights reserved.
        </span>
      </div>
    </footer>
  );
};
