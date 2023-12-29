import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: { code: string } },
) {
  const { code } = context.params;

  if (!code || code.length !== 2) {
    return NextResponse.json(
      { error: 'Country code is required' },
      { status: 400 },
    );
  }

  const res = await fetch(`https://flagcdn.com/${code}.svg`);
  const svg = await res.text();

  return NextResponse.json({ data: svg }, { status: 200 });
}
