'use client';
import { TableRow, TableCell } from '@mui/material';
import { useRouter } from 'next/navigation';
import type Standings from './types';

export default function StandingsRow({
    teamKey,
    teamName,
    topFour,
    total,
}: Standings.Row.Props) {
    const router = useRouter();
    return (
        <TableRow
            key={teamKey}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            className='cursor-pointer'
            hover={true}
            onClick={() => router.push(`/team/${teamKey}`)}>
            <TableCell component='th' scope='row'>
                <span>{teamName}</span>
            </TableCell>
            <TableCell align='right'>{topFour}</TableCell>
            <TableCell align='right'>{total}</TableCell>
        </TableRow>
    );
}
