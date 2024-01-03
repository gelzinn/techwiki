type TCard = {
  title: string;
  description: string;
  href: string;
};

export const cards: TCard[] = [
  {
    title: 'Explore',
    description: 'Browse all TechWiki notes.',
    href: '/explore',
  },
  {
    title: 'About',
    description: 'Learn more about TechWiki.',
    href: '/about',
  },
  {
    title: 'Contribute',
    description: 'Contribute to TechWiki.',
    href: '/contribute',
  },
  {
    title: 'GitHub',
    description: 'View the TechWiki GitHub repository.',
    href: '/github',
  },
];
