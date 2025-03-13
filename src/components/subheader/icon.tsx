'use client';
import type { SubheaderIconProps } from './types';
import { usePathname, useRouter } from 'next/navigation';

export default function Icon({ path, children }: SubheaderIconProps) {
  const router = useRouter();
  const pathname = usePathname();
  const shouldHighlight = pathname === path;
  return (
    <div
      onClick={() => !shouldHighlight && router.push(path, { scroll: false })}
      className={`rounded-lg border border-transparent p-2 ${shouldHighlight ? 'text-sky-300 dark:text-sky-600' : 'text-black dark:text-white cursor-pointer hover:bg-slate-600/30'}`}>
      {children}
    </div>
  );
}
