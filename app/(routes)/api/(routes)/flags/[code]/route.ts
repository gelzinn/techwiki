import { NextResponse } from '@/infra/next/server';

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

export async function GET(
  request: Request,
  context: { params: { code: string } },
) {
  const { code } = context.params;

  const countries = Object.keys(getCountries());

  if (
    !code ||
    code.length !== 2 ||
    code.match(/[^a-zA-Z]/) ||
    !countries.includes(code.toUpperCase())
  ) {
    return NextResponse.json(
      { error: 'Country code is not valid' },
      { status: 400 },
    );
  }

  const res = await fetch(`https://flagcdn.com/${code}.svg`);
  const svg = await res.text();

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
}
