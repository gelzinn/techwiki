import { NextResponse } from 'next/server';

import { repo, wikiPagesUrl as wikiUrl } from 'app/config/content';

import { notes as notesEnv } from 'app/config/env';

import { getNote } from '@/lib/notes';

export async function GET() {
  try {
    const res = await fetch(wikiUrl, {
      mode: 'no-cors',
      next: {
        revalidate: notesEnv.revalidate,
      },
    });

    const html = await res.text();

    const findThis = `${repo}/wiki/`;
    const filterThis = ['_toc', '_history', '_edit', '_new', '_delete', 'Home'];

    const links = html
      .split(findThis)
      .slice(1)
      .map((s) => s.split('"')[0])
      .filter((link) =>
        filterThis.every((substring) => !link.includes(substring)),
      )
      .map(decodeURIComponent);

    if (!links) return [];

    const notes: any = await Promise.all(
      links.map(async (link) => {
        const { meta } = await getNote(link);
        return meta;
      }),
    );

    return NextResponse.json({ data: notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
