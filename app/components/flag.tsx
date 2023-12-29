'use client';

import { useEffect, useState } from 'react';

export const Flag = ({ code, size }: { code: string; size?: number }) => {
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    const getFlag = async () => {
      try {
        const res = await fetch(`/api/flags/${code}`);
        const { data } = await res.json();

        setSource(data);
      } catch (error) {
        console.error(`Error fetching flag for ${code}`, error);
      }
    };

    getFlag();
  }, []);

  if (!source) return null;

  return (
    <i
      className="flex items-center justify-center w-24 h-auto aspect-video overflow-hidden pointer-events-none select-none rounded-sm bg-zinc-100 dark:bg-zinc-900"
      dangerouslySetInnerHTML={{ __html: source }}
      style={{ width: size }}
    />
  );
};
