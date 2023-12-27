import { Ubuntu } from 'next/font/google';
import Head from 'next/head';

import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/header';

import { seo } from './config/seo';

import '../styles/globals.css';
import { theme } from './config/theme';

export const metadata = {
  title: {
    default: `${seo.title.default} ${seo.title.separator} ${seo.description}`,
    template: seo.title.template,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: seo.authors,
  creator: seo.creator,
  url: seo.url,
  openGraph: seo.openGraph,
};

const font = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

export default function RootLayout({ children }: any) {
  return (
    <ThemeProvider>
      <html lang="en" className={`${font.className} ${theme.defaultTheme}`}>
        <head>
          <title>
            {seo.title.default} {seo.title.separator} {seo.description}
          </title>

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="google-adsense-account"
            content="ca-pub-8214931196684102"
          />

          <link rel="icon" href="/favicon.ico" />
        </head>

        <body className="relative h-screen w-full bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
          <Header />

          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
