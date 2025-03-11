import React from "react";
import type { StatItem, StatProps } from './types';
import Loadable from '../loadable';

export default function StatGrid({
  stats,
  isLoading,
  columns,
  className,
}: {
  stats: StatItem[];
  isLoading: boolean;
  columns: number;
  className?: string;
}) {
  const rows: StatItem[][] = [];
  for (let i = 0; i < stats.length; i += columns) {
    rows.push(stats.slice(i, i + columns));
  }
  return (
    <div className={`w-full h-full flex flex-col divided-y px-4 ${className}`}>
      {rows.map((row, index) => (
        <div key={index} className='h-full w-full py-2 flex flex-row divided-x'>
          {row
            .fill({ label: '', value: '' }, row.length, columns)
            .map((stat, index) => (
              <Stat
                isLoading={isLoading}
                label={stat.label}
                value={stat.value}
                key={index}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export function Stat({ isLoading, label, value }: StatProps) {
  return (
    <div className='flex flex-col w-full justify-center items-center text-center'>
      <div className='text-sm secondary-text'>{label}</div>
      <div className='text-xl'>
        <Loadable
          isLoading={isLoading}
          type='text-xl'
          width='w-10'
          className='w-full flex justify-center'>
          {value}
        </Loadable>
      </div>
    </div>
  );
}