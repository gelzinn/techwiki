import { NextResponse } from 'next/server';

import { repo, wikiPagesUrl as wikiUrl } from 'app/config/content';

import { notes as notesEnv } from 'app/config/env';

import { getNote } from '@/lib/notes';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const author: string | null = searchParams.get('author' || '');

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

    if (!links) return NextResponse.json({ data: [] }, { status: 200 });

    const notes: any = await Promise.all(
      links.map(async (link) => {
        const { meta } = await getNote(link);
        return meta;
      }),
    );

    let sortedNotes = [];

    if (!author) {
      sortedNotes = notes.sort((a: any, b: any) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return bDate.getTime() - aDate.getTime();
      });
    } else {
      sortedNotes = notes
        .filter((note: any) => note.authors.includes(author))
        .sort((a: any, b: any) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return bDate.getTime() - aDate.getTime();
        });
    }

    return NextResponse.json({ data: sortedNotes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
