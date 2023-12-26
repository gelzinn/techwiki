import '../styles/globals.css';
import { Header } from './components/header';

export default function RootLayout({ children }: any) {
  return (
    <html lang="pt-BR">
      <head>
        <title>
          TechWiki - A free and open-source knowledge base for developers
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className="relative w-full h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <Header />

        {children}
      </body>
    </html>
  );
}
