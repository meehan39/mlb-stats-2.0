'use client';
import { useRouter } from 'next/navigation';
import { HomeIcon, LeagueLeadersIcon, BackIcon } from '../svg';
import Icon from './icon';

import type Subheader from './types';

export default function Subheader({ text, showBack = true }: Subheader.Props) {
    const router = useRouter();
    return (
        <nav
            className={`sticky top-0 flex w-full h-16 justify-between items-center px-1 bg-slate-900 border-b border-slate-700 shadow`}>
            <div className='flex items-center'>
                {showBack && (
                    <div
                        onClick={router.back}
                        className='cursor-pointer rounded-lg border border-transparent p-4 transition-colors hover:border-slate-700 hover:bg-slate-800/30'>
                        <BackIcon />
                    </div>
                )}
                <h2 className={`text-xl font-semibold whitespace-nowrap`}>
                    {text}
                </h2>
            </div>
            <div className='flex items-center'>
                <Icon path='/leagueLeaders'>
                    <LeagueLeadersIcon />
                </Icon>
                <Icon path='/'>
                    <HomeIcon />
                </Icon>
            </div>
        </nav>
    );
}
