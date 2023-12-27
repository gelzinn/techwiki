import { Ubuntu } from 'next/font/google';

import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/header';

import '../styles/globals.css';
import Script from 'next/script';

const font = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" className={font.className}>
      <head>
        <title>
          TechWiki - A free and open-source knowledge base for developers
        </title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </head>

      <ThemeProvider>
        <body className="relative h-screen w-full bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
          <Header />

          {children}

          <Script
            async
            id="adsense"
            data-ad-client="ca-pub-8214931196684102"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
        </body>
      </ThemeProvider>
    </html>
  );
}
