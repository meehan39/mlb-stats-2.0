'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type Subheader from './types';

export default function Subheader({ text }: Subheader.Props) {
    const router = useRouter();
    return (
        <div className={`flex w-full justify-between items-center`}>
            <div
                onClick={router.back}
                className='rounded-lg border border-transparent p-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
                <Image src='/back.svg' alt='' width={20} height={20} />
            </div>
            <h2 className={`mb-3 text-xl font-semibold whitespace-nowrap px-4`}>
                {text}
            </h2>
        </div>
    );
}
