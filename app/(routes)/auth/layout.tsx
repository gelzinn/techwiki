import { ReactNode } from 'react';

import { seo } from '@/config/seo';

export const metadata = {
  title: {
    default: `Authentication ${seo.title.separator} ${seo.title.default}`,
    template: seo.title.template,
  },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return children;
}
