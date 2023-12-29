'use client';

import { useEffect, useState } from 'react';

const getCountries = (lang = 'en') => {
  const A = 65;
  const Z = 90;

  const countryName = new Intl.DisplayNames([lang], { type: 'region' });
  const countries: any = {};

  for (let i = A; i <= Z; ++i) {
    for (let j = A; j <= Z; ++j) {
      let code = String.fromCharCode(i) + String.fromCharCode(j);
      let name = countryName.of(code);
      if (code !== name) {
        countries[code] = name;
      }
    }
  }
  return countries;
};

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
        const countries = Object.keys(getCountries());

        if (!countryCode) return;

        if (!countries.includes(countryCode)) return;

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
      id={`flag-${code}`}
      role="img"
      className="pointer-events-none flex aspect-video h-auto w-24 select-none items-center justify-center overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-900"
      style={{ width: size }}
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
};
