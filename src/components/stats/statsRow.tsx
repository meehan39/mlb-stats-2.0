'use client';
import { TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/navigation';
import type Stats from './types';

export default function StatsRow({
    playerId,
    name,
    homeRuns,
}: Stats.Row.Props) {
    const router = useRouter();
    return (
        <TableRow
            key={playerId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            className='cursor-pointer'
            hover={true}
            onClick={() => router.push(`/player/${playerId}`)}>
            <TableCell component='th' scope='row'>
                {name}
            </TableCell>
            <TableCell align='right'>{homeRuns}</TableCell>
        </TableRow>
    );
}
