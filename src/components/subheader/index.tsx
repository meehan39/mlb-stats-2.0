'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type Subheader from './types';

export default function Subheader({ text }: Subheader.Props) {
    const router = useRouter();
    return (
        <div
            className={`sticky top-0 flex w-full h-16 justify-between items-center bg-slate-900 border-b border-slate-700`}>
            <div
                onClick={router.back}
                className='cursor-pointer rounded-lg border border-transparent p-4 transition-colors hover:border-slate-700 hover:bg-slate-800/30'>
                <Image src='/back.svg' alt='' width={20} height={20} />
            </div>
            <h2 className={`text-xl font-semibold whitespace-nowrap px-4`}>
                {text}
            </h2>
        </div>
    );
}
