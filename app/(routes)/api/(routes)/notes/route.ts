import { NextResponse } from '@/infra/next/server';

import { repo, wikiPagesUrl as wikiUrl } from 'app/config/content';

import { notes as notesEnv } from 'app/config/env';

import { getNote } from '@/lib/notes';
import { IPost } from '@/@types/post';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const params = {
    author: searchParams.get('author') || null,
    category: searchParams.get('category') || null,
  };

  const authors = params.author ? params.author.split(',') : null;
  const categories = params.category ? params.category.split(',') : null;

  try {
    const res = await fetch(wikiUrl, {
      mode: 'no-cors',
      next: {
        revalidate: notesEnv.revalidate,
      },
    });

    const html = await res.text();

    const findThis = `${repo}/wiki/`;
    const filterThis = [
      '_toc',
      '_history',
      '_edit',
      '_new',
      '_delete',
      'Home',
      'home',
    ];

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

    if (!authors && !categories) {
      sortedNotes = notes.sort((a: any, b: any) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return bDate.getTime() - aDate.getTime();
      });
    } else {
      if (authors) {
        authors.forEach((author) => {
          const lowercaseAuthor = author.toLowerCase();
          const authorNotes = notes.filter((note: IPost) =>
            note.authors.map((a) => a.toLowerCase()).includes(lowercaseAuthor),
          );
          sortedNotes.push(...authorNotes);
        });
      }

      if (categories) {
        categories.forEach((category) => {
          const lowercaseCategory = category.toLowerCase();
          const categoryNotes = notes.filter((note: IPost) =>
            note.categories
              .map((c) => c.toLowerCase())
              .includes(lowercaseCategory),
          );
          sortedNotes.push(...categoryNotes);
        });
      }
    }

    return NextResponse.json({ data: sortedNotes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Error on fetching notes',
      },
      { status: 500 },
    );
  }
}
