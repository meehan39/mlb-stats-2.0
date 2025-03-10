import React from "react";
import type { StatProps } from "./types";
import Loadable from "../loadable";

export default function StatGrid({
  stats,
  isLoading,
  columns,
  className,
}: {
  stats: { label: string; value: string | number }[];
  isLoading: boolean;
  columns: number;
  className?: string;
}) {
  const rows = [];
  for (let i = 0; i < stats.length; i += columns) {
    const chunk = Array.from(
      { length: columns },
      (_, index) => stats[i + index],
    ).map(stat => {
      return stat ?? { label: '', value: '' };
    });
    rows.push(chunk);
  }
  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      {rows.map((row, index) => (
        <React.Fragment key={index}>
          <div key={index} className='h-full w-full py-1 flex flex-row'>
            {(row.fill({
              label: '',
              value: '',
            }, row.length, columns)).map((stat, index) => (
              <React.Fragment key={index}>
                <Stat
                  isLoading={isLoading}
                  label={stat.label}
                  value={stat.value}
                  key={index}
                />
                {index !== row.length - 1 && (
                  <div className='divider-vertical' />
                )}
              </React.Fragment>
            ))}
          </div>
          {index !== rows.length - 1 && <div className='divider-horizontal' />}
        </React.Fragment>
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