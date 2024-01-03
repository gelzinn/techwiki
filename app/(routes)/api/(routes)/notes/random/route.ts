import { NextResponse } from '@/infra/next/server';

import { notes as notesEnv, baseUrl } from '@/config/env';

export async function GET() {
  try {
    const res = await fetch(`${baseUrl}/api/notes`, {
      mode: 'no-cors',
      next: {
        revalidate: notesEnv.revalidate,
      },
    });

    const { data } = await res.json();

    const randomNote = data[Math.floor(Math.random() * data.length)];

    return NextResponse.json(
      {
        data: randomNote,
      },
      {
        status: 200,
        headers: {
          'cache-control': 'no-cache',
        },
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Error on getting random note.',
      },
      { status: 500 },
    );
  }
}
