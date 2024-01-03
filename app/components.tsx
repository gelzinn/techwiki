'use client';

import { Fragment, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { preventComponents } from '@/config';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const ComponentsLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      {!preventComponents.some((prevent) =>
        prevent.routes.includes(pathname),
      ) ? (
        <>
          <Header />
          {children}
          <Footer />
        </>
      ) : (
        children
      )}
    </>
  );
};
