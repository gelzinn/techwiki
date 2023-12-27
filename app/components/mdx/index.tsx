'use client';

import { ReactNode } from 'react';

import './styles.css';

export default function MDX({ children }: { children: ReactNode }) {
  return (
    <section
      className="mb-4 flex w-full flex-col items-start justify-start gap-4 mdx-content"
      aria-label="Content"
    >
      {children}
    </section>
  );
}
