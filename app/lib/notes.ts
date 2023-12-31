import { compileMDX } from 'next-mdx-remote/rsc';

import {
  defaultWikiUrl as baseUrl,
  repo,
  wikiPagesUrl as wikiUrl,
} from '@/config/content';

import { notes as notesEnv } from '@/config/env';

export const getNote = async (s: string) => {
  const slug = s
    .replace(/\.md$/, '')
    .replace(/ /g, '‐')
    .replace(/-/g, '‐')
    .replace(/_/g, '‐')
    .toLowerCase()
    .trim();

  const url = `${baseUrl}/${slug}.md`;

  const res = await fetch(url, {
    mode: 'no-cors',
    next: {
      revalidate: notesEnv.revalidate,
    },
  });
  const source = await res.text();

  const { frontmatter, content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return {
    meta: {
      ...frontmatter,
      slug,
    },
    content,
  };
};

export const getNotes = async () => {
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

  return notes;
};
