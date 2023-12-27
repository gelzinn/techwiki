'use client';

import { ReactNode } from 'react';

import './styles.css';

export default function MDX({ children }: { children: ReactNode }) {
  return (
    <section
      className="mdx-content mb-4 flex w-full flex-col items-start justify-start gap-4"
      aria-label="Content"
    >
      {children}
    </section>
  );
}
