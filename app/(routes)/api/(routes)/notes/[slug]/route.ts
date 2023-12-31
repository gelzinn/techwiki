import { getNote } from '@/lib/notes';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: { slug: string } },
) {
  const { slug } = context.params;

  const { meta, content } = await getNote(slug);

  if (!meta) {
    return NextResponse.json(
      { error: `Note with slug "${slug}" not found` },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: { meta, content } }, { status: 200 });
}
