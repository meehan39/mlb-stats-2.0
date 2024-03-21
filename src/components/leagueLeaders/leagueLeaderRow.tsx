'use client';
import { useRouter } from 'next/navigation';
import { TableRow, TableCell } from '@mui/material';
import { LEAGUE_DATA } from '../../constants';
import type LeagueLeaders from './types';

export default function LeagueLeaderRow({
    playerId,
    fullName,
    teamKey,
    homeRuns,
}: LeagueLeaders.Row.Props) {
    const router = useRouter();
    const teamName = teamKey ? LEAGUE_DATA[teamKey].teamName : '';
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            className='cursor-pointer'
            hover={true}
            onClick={() => router.push(`/player/${playerId}`)}>
            <TableCell component='th' scope='row'>
                {fullName}
            </TableCell>
            <TableCell align='left'>{teamName}</TableCell>
            <TableCell align='right'>{homeRuns}</TableCell>
        </TableRow>
    );
}
