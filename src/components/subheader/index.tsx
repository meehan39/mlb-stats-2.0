'use client';
import Icon from './icon';
import Dropdown from '../dropdown';
import Loadable from '../loadable';
import { HomeIcon, ChartBarIcon } from '@heroicons/react/20/solid';
import { selectSubheader } from '../../store/subheader/slice';
import { useAppSelector } from '../../store/hooks';

import type Subheader from './types';

export default function Subheader() {
  const text = useAppSelector(selectSubheader);

  return (
    <nav className='sticky top-0 w-full h-16 flex justify-center items-center pl-3 pr-1 bg-slate-400 dark:bg-slate-900 z-10'>
      <div className='max-w-4xl w-full flex justify-between items-center'>
        <div className='flex items-center truncate'>
          <Loadable isLoading={text === null} type={'text-lg'} width='w-40'>
            <h2 className='text-lg font-semibold truncate'>{text}</h2>
          </Loadable>
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
      </div>
    </nav>
  );
}
