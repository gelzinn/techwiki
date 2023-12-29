import { features } from '@/config/content';
import { CheckCircle } from 'lucide-react';

export const SkewedInfiniteCarousel = ({
  shadow = true,
  content = features,
}: {
  shadow?: boolean;
  content?: string[];
}) => {
  return (
    <>
      <div className="relative w-full max-w-screen-lg overflow-hidden">
        {shadow && (
          <>
            <div className="pointer-events-none absolute -top-1 z-10 h-20 w-full bg-gradient-to-b from-zinc-50 to-transparent dark:from-zinc-950 dark:to-transparent" />
            <div className="pointer-events-none absolute -bottom-1 z-10 h-20 w-full bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-950 dark:to-transparent" />
            <div className="pointer-events-none absolute -left-1 z-10 h-full w-20 bg-gradient-to-r from-zinc-50 to-transparent dark:from-zinc-950 dark:to-transparent" />
            <div className="pointer-events-none absolute -right-1 z-10 h-full w-20 bg-gradient-to-l from-zinc-50 to-transparent dark:from-zinc-950 dark:to-transparent" />
          </>
        )}

        {content && (
          <div className="mx-auto grid h-[250px] w-[300px] animate-skew-scroll grid-cols-1 gap-5 sm:w-[600px] sm:grid-cols-2">
            {[...Array(32)].map((_, i) => (
              <div
                key={i}
                className="flex cursor-pointer items-center space-x-2 rounded-md border border-zinc-200 bg-zinc-100 p-4 shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl dark:border-zinc-900 dark:bg-zinc-950"
              >
                <CheckCircle
                  className="h-4 w-4 text-emerald-500"
                  aria-hidden="true"
                />
                <p className="text-zinc-500 dark:text-zinc-400">
                  {content[i % content.length]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
