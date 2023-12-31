import { NextResponse } from '@/infra/next/server';

import { baseUrl } from '@/config/env';

export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(`${baseUrl}/api/notes`, {
      mode: 'no-cors',
      cache: 'no-cache',
    });

    const { data } = await res.json();

    const randomNote = data[Math.floor(Math.random() * data.length)];

    return NextResponse.json(
      {
        data: randomNote,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Error on getting random note.',
      },
      { status: 500 },
    );
  }
}
