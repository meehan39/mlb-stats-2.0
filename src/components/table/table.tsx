'use client';
import { useRouter } from 'next/navigation';
import type Table from './types';

export default function Table({ headers, rows, hideHeader }: Table.Props) {
    const router = useRouter();
    return (
        <table className='table-auto w-full border-collapse text-sm'>
            {!hideHeader && (
                <thead className='sticky top-16 table-header-group bg-slate-900 shadow'>
                    <tr>
                        {headers.map(({ text, align }, index) => (
                            <th
                                key={index}
                                className={`text-${align ?? 'left'} p-3 table-cell`}>
                                {text}
                            </th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody className='divide-y divide-slate-950'>
                {rows.map(({ cells, link }, index) => (
                    <tr
                        key={index}
                        className={`bg-slate-800 hover:bg-slate-700 ${link ? 'cursor-pointer' : ''}`}
                        onClick={link ? () => router.push(link) : undefined}>
                        {cells.map((cell, index) => (
                            <td
                                key={index}
                                className={`p-3 text-${headers[index].align ?? 'left'}`}>
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
