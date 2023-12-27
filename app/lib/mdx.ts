import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';

const root = path.join(process.cwd(), 'app', 'content');

export const getNote = async (s: string) => {
  const slug = s.replace(/\.mdx$/, '');
  const path = `${root}/${slug}/page.mdx`;

  const file = fs.readFileSync(path, { encoding: 'utf-8' });

  const { frontmatter, content } = await compileMDX({
    source: file,
    options: { parseFrontmatter: true },
  });

  const note = {
    content,
    meta: {
      slug,
      ...frontmatter,
    },
  };

  return note;
};

export const getNotes = async () => {
  const files = fs.readdirSync(root);
  const notes = [];

  for (const slug of files) {
    const { meta } = await getNote(slug);
    notes.push(meta);
  }

  return notes;
};
