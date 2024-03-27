'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Sort } from '../svg';
import type Table from './types';

export default function Table({ headers, rows, hideHeader }: Table.Props) {
    const handleSort = (index: number) => {
        if (index === sortIndex) {
            setSortedRows(sortedRows.reverse());
        } else {
            setSortedRows(sort(index));
            setSortIndex(index);
        }
        setRowComponents(renderRows());
    };
    const sort = (index: number) => {
        const newSort = rows.sort((rowA, rowB) => {
            const a = rowA.cells[index];
            const b = rowB.cells[index];
            if (typeof a === 'number' && typeof b === 'number') {
                return b - a;
            } else if (typeof a === 'string' && typeof b === 'string') {
                return a.localeCompare(b);
            } else {
                return typeof a === 'number' ? -1 : 1;
            }
        });
        return newSort == sortedRows ? newSort.reverse() : newSort;
    };

    const renderRows = () =>
        rows.map(({ cells, link }, index) => (
            <tr
                key={index}
                className={`bg-slate-800 hover:bg-slate-700 ${link ? 'cursor-pointer' : ''}`}
                onClick={
                    link
                        ? () => router.push(link, { scroll: false })
                        : undefined
                }>
                {cells.map((cell, index) => (
                    <td
                        key={index}
                        className={`p-3 ${headers[index].align === 'right' ? 'text-right' : 'text-left'}`}>
                        {cell}
                    </td>
                ))}
            </tr>
        ));

    const router = useRouter();
    const [sortIndex, setSortIndex] = useState(-1);
    const [sortedRows, setSortedRows] = useState(rows);
    const [rowComponents, setRowComponents] = useState(renderRows());

    return (
        <table className='table-auto w-full border-collapse text-sm'>
            {!hideHeader && (
                <thead className='sticky top-16 table-header-group bg-slate-900 shadow'>
                    <tr>
                        {headers.map(({ text, align, sort }, index) => (
                            <th
                                onClick={
                                    sort
                                        ? () => {
                                              handleSort(index);
                                          }
                                        : undefined
                                }
                                key={index}
                                className={`p-3 table-cell ${sort ? 'cursor-pointer' : ''}`}>
                                <div
                                    className={`flex items-center ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
                                    {text} {sort && <Sort />}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody className='divide-y divide-slate-950'>{rowComponents}</tbody>
        </table>
    );
}
