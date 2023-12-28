import { compileMDX } from 'next-mdx-remote/rsc';
import {
  defaultWikiUrl as baseUrl,
  repo,
  wikiPagesUrl as wikiUrl,
} from 'app/config/content';

export const getNote = async (s: string) => {
  const slug = s
    .replace(/\.md$/, '')
    .replace(/ /g, '‐')
    .replace(/-/g, '‐')
    .replace(/_/g, '‐')
    .toLowerCase()
    .trim();

  const url = `${baseUrl}/${slug}.md`;

  const res = await fetch(url);
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
    headers: {
      Accept: 'text/html',
    },
    mode: 'no-cors',
    next: {
      revalidate: 10,
    },
  });

  const html = await res.text();

  const findThis = `${repo}/wiki/`;
  const filterThis = ['_toc', '_history', '_edit', '_new'];

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
