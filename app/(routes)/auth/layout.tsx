import { seo } from '@/config/seo';

export const metadata = {
  title: {
    default: `Authentication ${seo.title.separator} ${seo.title.default}`,
    template: seo.title.template,
  },
};

export default function AuthLayout({ children }: any) {
  return children;
}
