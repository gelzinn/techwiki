type TCard = {
  title: string;
  description: string;
  href: string;
};

export const cards: TCard[] = [
  {
    title: 'All Notes',
    description: 'Browse all TechWiki notes.',
    href: '/explore',
  },
  {
    title: 'All Topics',
    description: 'Browse all TechWiki topics.',
    href: '/topics',
  },
  {
    title: 'All Categories',
    description: 'Browse all TechWiki categories.',
    href: '/categories',
  },
  {
    title: 'All Tags',
    description: 'Browse all TechWiki tags.',
    href: '/tags',
  },
];
