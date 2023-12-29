'use client';

import { useEffect, useState } from 'react';

export const Flag = ({
  countryCode,
  size,
}: {
  countryCode: string;
  size?: number;
}) => {
  const code = countryCode.toLowerCase();

  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    const getFlag = async () => {
      try {
        if (!countryCode) return;

        const res = await fetch(`/api/flags/${countryCode}`);
        const { data } = await res.json();

        setSource(data);
      } catch (error) {
        console.error(`Error fetching flag for ${countryCode}`, error);
      }
    };

    getFlag();
  }, [countryCode]);

  if (!source) return null;

  return (
    <i
      role={`flag-${code}`}
      className="pointer-events-none flex aspect-video h-auto w-24 select-none items-center justify-center overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-900"
      style={{ width: size }}
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
};
