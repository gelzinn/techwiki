'use client';

import { useEffect, useState } from 'react';

export const Flag = ({ code, size }: { code: string; size?: number }) => {
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    const getFlag = async () => {
      try {
        if (!code) return;

        const res = await fetch(`/api/flags/${code}`);
        const { data } = await res.json();

        setSource(data);
      } catch (error) {
        console.error(`Error fetching flag for ${code}`, error);
      }
    };

    getFlag();
  }, [code]);

  if (!source) return null;

  return (
    <i
      dangerouslySetInnerHTML={{ __html: source }}
      className="pointer-events-none flex aspect-video h-auto w-24 select-none items-center justify-center overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-900"
      style={{ width: size }}
    />
  );
};
