'use client';
import Loadable from '../loadable';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type TableTypes from './types';
import type {
  Row,
  TableBodyProps,
  TableHeaderProps,
  TableProps,
} from './types';

export default function Table({
  headers,
  rows: rowProps,
  loadingRows,
  defaultSortIndex,
}: TableProps) {
  const [rows, setRows] = useState(rowProps);
  const [sortIndex, setSortIndex] = useState<number>(defaultSortIndex ?? 0);

  useEffect(() => {
    setSortIndex(defaultSortIndex ?? 0);
    setRows(sortRows(rowProps, defaultSortIndex ?? 0, false));
  }, [rowProps]);

  function THead({ headers }: TableHeaderProps) {
    return (
      <thead className='sticky top-16 table-header-group bg-slate-400 dark:bg-slate-900 raised z-0'>
        <tr>
          {headers.map(({ text, align }, index) => (
            <th
              onClick={() => {
                if (text) {
                  const sortedRows = sortRows(rows, index, index === sortIndex);
                  setRows(sortedRows);
                  setSortIndex(index);
                }
              }}
              key={index}
              className={`py-3 px-2 md:px-5 font-bold decoration-sky-300 dark:decoration-sky-600 underline-offset-2 decoration-4 ${
                index === sortIndex && 'underline'
              } ${align === 'right' ? 'text-right' : 'text-left'} ${
                text && `cursor-pointer hover:bg-slate-600/30`
              }`}>
              <div
                className={`flex items-center ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
                {text}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  return (
    <table className='table-auto w-full card overflow-clip whitespace-nowrap text-sm md:text-md'>
      <THead headers={headers} />
      <TBody rows={rows} headers={headers} loadingRows={loadingRows} />
    </table>
  );
}

function TBody({ rows: rowProps, headers, loadingRows }: TableBodyProps) {
  const router = useRouter();
  const [rows, setRows] = useState(rowProps);
  useEffect(() => {
    setRows(rowProps);
  }, [rowProps]);
  return (
    <tbody className='divided-y font-medium px-4'>
      {(rows.length ? rows : Array.from({ length: loadingRows })).map(
        (item, index) => {
          const { cells, link } = (item as TableTypes.Row) ?? {};
          return (
            <tr
              key={index}
              className={`hover:bg-slate-300 dark:hover:bg-slate-700 ${link && 'cursor-pointer'}`}
              onClick={
                link ? () => router.push(link, { scroll: false }) : undefined
              }>
              {headers.map(({ align, className, loadingWidth }, index) => (
                <td
                  key={index}
                  className={`py-3 px-2 md:px-5 ${align === 'right' ? 'text-right' : 'text-left'} ${className}`}>
                  {
                    <Loadable
                      isLoading={!cells}
                      type={'text-sm'}
                      width={loadingWidth ?? 'w-5'}
                      className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
                      {cells?.[index]}
                    </Loadable>
                  }
                </td>
              ))}
            </tr>
          );
        },
      )}
    </tbody>
  );
}

const sortRows = (rows: Row[], index: number, reverse: Boolean) => {
  if (reverse) {
    return [...rows].reverse();
  }
  const sortedRows = [...rows].sort((a, b) => {
    const cellA = a.cells[index];
    const cellB = b.cells[index];
    if (typeof cellB === 'string') {
      return cellB.localeCompare(cellA as string);
    }
    return (cellB as number) - (cellA as number);
  });
  return sortedRows;
};
