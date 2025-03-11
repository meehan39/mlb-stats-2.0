'use client';
import Loading from '../loadable';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import type TableTypes from './types';

export default function Table({
  headers,
  rows: rowProps,
  hideHeader,
  loadingRows,
}: TableTypes.Props) {
  const [rows, setRows] = useState(rowProps);
  useEffect(() => {
    setRows(rowProps);
  }, [rowProps]);

  return (
    <table className='table-auto w-full text-sm md:my-6 md:rounded-xl overflow-clip raised ring-2 ring-slate-300 dark:ring-slate-600'>
      {!hideHeader && <THead headers={headers} />}
      <TBody
        rows={rows}
        alignments={headers.map(({ align }) => align ?? 'left')}
        loadingRows={loadingRows}
      />
    </table>
  );
}

function TBody({
  rows: rowProps,
  alignments,
  loadingRows,
}: TableTypes.TBody.Props) {
  const router = useRouter();
  const [rows, setRows] = useState(rowProps);
  useEffect(() => {
    setRows(rowProps);
  }, [rowProps]);
  return (
    <tbody className='divide-y divide-slate-100 dark:divide-slate-950 font-medium'>
      {(rows.length ? rows : Array.from({ length: loadingRows })).map(
        (item, index) => {
          const { cells, link } = (item as TableTypes.Row) ?? {};
          return (
            <tr
              key={index}
              className={`bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 ${link && 'cursor-pointer'}`}
              onClick={
                link ? () => router.push(link, { scroll: false }) : undefined
              }>
              {alignments.map((align, index) => (
                <td
                  key={index}
                  className={`px-3 py-4 md:px-5 ${align === 'right' ? 'text-right' : 'text-left'}`}>
                  {/* {
                    <Loading
                      isLoading={!cells}
                      text='sm'
                      width='w-16'
                      align={align}>
                      {cells?.[index]}
                    </Loading>
                  } */}
                </td>
              ))}
            </tr>
          );
        },
      )}
    </tbody>
  );
}

function THead({ headers }: TableTypes.THead.Props) {
  return (
    <thead className='sticky top-16 table-header-group bg-slate-400 dark:bg-slate-900 raised z-0'>
      <tr>
        {headers.map(({ text, align, sort }, index) => (
          <th
            onClick={sort}
            key={index}
            className={`p-3 md:px-5 md:pt-5 table-cell border-none font-bold ${sort ? 'cursor-pointer' : ''}`}>
            <div
              className={`flex items-center ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
              {text} {sort && <ChevronDownIcon className='h-4 w-4' />}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
