import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const TechWikiLogo = ({
  isLink = false,
  customLink = null,
  className,
}: {
  isLink?: boolean;
  customLink?: string | null;
  className?: string;
}) => {
  const BaseName = () => (
    <>
      <span className="font-bold">Tech</span>
      <span className="font-light">Wiki</span>
    </>
  );

  if (customLink && !isLink) {
    console.error(
      `You should not use "customLink" prop without "isLink" prop. Please use "isLink" prop with "customLink" prop.`,
    );
  }

  return (
    <h1
      className={`pointer-events-none h-auto select-none ${className || ''} ${
        inter.className
      }`}
      aria-label="TechWiki"
    >
      {isLink ? (
        <>
          <a href={customLink || '/'}>
            <BaseName />
          </a>
        </>
      ) : (
        <BaseName />
      )}
    </h1>
  );
};
