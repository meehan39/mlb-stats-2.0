'use client';
import Icon from './icon';
import Dropdown from '../dropdown';
import { HomeIcon, ChartBarIcon } from '@heroicons/react/20/solid';

import type Subheader from './types';

export default function Subheader({ text }: Subheader.Props) {
    return (
        <nav className='sticky top-0 flex w-full h-16 justify-between items-center pl-3 pr-1 bg-slate-900 border-b border-slate-700 shadow z-10'>
            <div className='flex items-center truncate'>
                <h2 className='text-l font-semibold truncate'>{text}</h2>
            </div>
            <div className='flex items-center'>
                <Icon path='/leagueLeaders'>
                    <ChartBarIcon className='h-5 w-5' />
                </Icon>
                <Icon path='/'>
                    <HomeIcon className='h-5 w-5' />
                </Icon>
                <Dropdown />
            </div>
        </nav>
    );
}
