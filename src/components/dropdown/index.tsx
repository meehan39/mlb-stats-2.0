import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';
import { setTimeSpan } from '../../lib/timeSpan/slice';
import { timeSpanValues } from '../../constants';
import { TimeSpan } from '../../constants/types';

export default function TimeSpanDropdown() {
    const timeSpanKeys = Array.from(
        { length: new Date().getMonth() - 1 },
        (_, index) => (3 + index).toString() as TimeSpan,
    )
        .concat(['season'])
        .reverse();
    const timeSpan = useAppSelector(selectTimeSpan);
    const dispatch = useAppDispatch();
    return (
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex w-full justify-center rounded-md bg-white/20 dark:bg-black/20 px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-white/30 dark:hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'>
            {timeSpanValues[timeSpan]}
            <ChevronDownIcon
              className='-mr-1 ml-2 h-5 w-5'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'>
          <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-slate-900 rounded-md bg-white dark:bg-slate-700 raised ring-1 ring-black/5 focus:outline-none z-10'>
            {timeSpanKeys.map(timeSpanKey => (
              <Menu.Item key={timeSpanKey}>
                <button
                  onClick={() => dispatch(setTimeSpan(timeSpanKey))}
                  className='text-slate-800 dark:text-white hover:bg-black/10 dark:hover:bg-black/30 group flex w-full items-center rounded-md px-2 py-2 text-sm'>
                  {timeSpanValues[timeSpanKey]}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    );
}
