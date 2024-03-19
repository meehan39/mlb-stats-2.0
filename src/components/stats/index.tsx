import axios from '../../utils/axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import StatsRow from './statsRow';

import { redirect } from 'next/navigation';
import { LEAGUE_DATA } from '../../constants';

import type { TeamKey } from '../../constants/types';
import type Team from '../../app/api/team/[teamKey]/types';
import type Stats from './types';

export default async function Stats(props: Stats.Props) {
    const teamKey: TeamKey = props.teamKey;
    const team = LEAGUE_DATA[teamKey];
    if (!team) {
        redirect('/');
    }
    const { data } = (await axios.get(`/api/team/${teamKey}`)) as Team.Response;
    data.sort((a, b) => (a.homeRuns < b.homeRuns ? 1 : -1));
    return (
        <>
            <div className={`flex w-full justify-start items-center`}>
                <h2 className={`mb-3 text-xl font-semibold whitespace-nowrap`}>
                    {LEAGUE_DATA[teamKey].teamName}
                </h2>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Player</TableCell>
                            <TableCell align='right'>Home Runs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(({ playerId, name, homeRuns }) => (
                            <StatsRow
                                key={playerId}
                                playerId={playerId}
                                name={name}
                                homeRuns={homeRuns}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
