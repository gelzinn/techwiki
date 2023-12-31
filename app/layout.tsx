import { Ubuntu } from 'next/font/google';
import { Toaster } from '@/infra/sonner';

import { ComponentsLayout as LayoutProvider } from '@/components';

import { seo } from '@/config/seo';
import { theme } from '@/config/theme';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

import '../styles/globals.css';

export const metadata = {
  title: {
    default: `${seo.title.default} ${seo.title.separator} ${seo.description}`,
    template: seo.title.template,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: seo.authors,
  creator: seo.creator,
};

const font = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

export default function RootLayout({ children }: any) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <html lang="en" className={`${font.className} ${theme.defaultTheme}`}>
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              name="google-adsense-account"
              content="ca-pub-8214931196684102"
            />
            <link rel="icon" href="https://wiki.gelzin.com/api/emoji/🌐" />
          </head>

          <body className="relative h-auto min-h-screen w-full bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
            <Toaster richColors closeButton />
            <LayoutProvider>{children}</LayoutProvider>
          </body>
        </html>
      </ThemeProvider>
    </LanguageProvider>
  );
}
