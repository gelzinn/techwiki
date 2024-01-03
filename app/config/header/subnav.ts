type TSubnav = {
  title: string;
  href: string;
  tab: string;
  default?: boolean;
};

export const subnav: TSubnav[] = [
  {
    title: 'Recents',
    href: '/explore?tab=recents',
    tab: 'recents',
    default: true,
  },
  {
    title: 'Popular',
    href: '/explore?tab=popular',
    tab: 'popular',
  },
  {
    title: 'Following',
    href: '/explore?tab=following',
    tab: 'following',
  },
];
