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
      {preventComponents.map((prevent) => {
        const { routes, components } = prevent;

        if (routes.includes(pathname)) {
          return (
            <Fragment key={routes.join(',')}>
              {!components.includes('Header') && <Header />}
              {children}
              {!components.includes('Footer') && <Footer />}
            </Fragment>
          );
        }

        return (
          <Fragment key={routes.join(',')}>
            <Header />
            {children}
            <Footer />
          </Fragment>
        );
      })}
    </>
  );
};
