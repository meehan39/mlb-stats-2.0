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
import Subheader from '../subheader';

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
            <Subheader text={LEAGUE_DATA[teamKey].teamName} />
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
