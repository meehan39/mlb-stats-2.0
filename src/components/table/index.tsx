'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import type Table from './types';

export default function Table({
    headers,
    rows: rowProps,
    hideHeader,
}: Table.Props) {
    const [rows, setRows] = useState(rowProps);
    useEffect(() => {
        setRows(rowProps);
    }, [rowProps]);

    return (
        <table className='table-auto w-full border-collapse text-sm'>
            {!hideHeader && <THead headers={headers} />}
            <TBody
                rows={rows}
                alignments={headers.map(({ align }) => align ?? 'left')}
            />
        </table>
    );
}

function TBody({ rows: rowProps, alignments }: Table.TBody.Props) {
    const router = useRouter();
    const [rows, setRows] = useState(rowProps);

    useEffect(() => {
        setRows(rowProps);
    }, [rowProps]);
    return (
        <tbody className='divide-y divide-slate-100 dark:divide-slate-950'>
            {rows.map(({ cells, link }, index) => (
                <tr
                    key={index}
                    className={`bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 ${link ? 'cursor-pointer' : ''}`}
                    onClick={
                        link
                            ? () => router.push(link, { scroll: false })
                            : undefined
                    }>
                    {cells.map((cell, index) => (
                        <td
                            key={index}
                            className={`p-3 ${alignments[index] === 'right' ? 'text-right' : 'text-left'}`}>
                            {cell}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

function THead({ headers }: Table.THead.Props) {
    return (
        <thead className='sticky top-16 table-header-group bg-slate-400 dark:bg-slate-900 shadow z-0'>
            <tr>
                {headers.map(({ text, align, sort }, index) => (
                    <th
                        onClick={sort}
                        key={index}
                        className={`p-3 table-cell ${sort ? 'cursor-pointer' : ''}`}>
                        <div
                            className={`flex items-center ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
                            {text}{' '}
                            {sort && <ChevronDownIcon className='h-4 w-4' />}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
}
