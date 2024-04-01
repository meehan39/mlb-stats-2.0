'use client';
import type Subheader from './types';
import { usePathname, useRouter } from 'next/navigation';

export default function Icon({ path, children }: Subheader.Icon.Props) {
    const router = useRouter();
    const pathname = usePathname();
    const shouldHighlight = pathname === path;
    return (
        <div
            onClick={() =>
                !shouldHighlight && router.push(path, { scroll: false })
            }
            className={`rounded-lg border border-transparent p-2 transition-colors ${shouldHighlight ? 'text-sky-300 dark:text-sky-600' : 'text-black dark:text-white cursor-pointer hover:border-slate-700 hover:bg-slate-800/30'}`}>
            {children}
        </div>
    );
}
