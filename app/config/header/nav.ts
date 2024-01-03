type TNav = {
  title: string;
  href: string;
  key: string;
  mobile?: boolean;
};

export const nav: TNav[] = [
  {
    title: 'Home',
    href: '/',
    key: 'home',
    mobile: true,
  },
  {
    title: 'Explore',
    href: '/explore',
    key: 'explore',
  },
  {
    title: 'About',
    href: '/about',
    key: 'about',
  },
  {
    title: 'Contact',
    href: '/contact',
    key: 'contact',
  },
];
