import { twMerge as cm } from 'tailwind-merge';

export const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={cm(
        'h-6 w-6 animate-spin rounded-full border-2 border-dashed border-gray-950 dark:border-gray-50',
        className,
      )}
      role="status"
    />
  );
};
