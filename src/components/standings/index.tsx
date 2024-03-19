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

import StandingsRow from './standingsRow';

import { LEAGUE_DATA } from '../../constants';

import type { TeamKey } from '../../constants/types';
import type Totals from '../../app/api/totals/types';
import type Standings from './types';

export default async function Standings() {
    const { data } = (await axios.get(`/api/totals`)) as Totals.Response;
    const rows = (Object.keys(LEAGUE_DATA) as TeamKey[])
        .map(
            teamKey =>
                ({
                    teamKey,
                    teamName: LEAGUE_DATA[teamKey].teamName,
                    topFour: data[teamKey].topFour,
                    total: data[teamKey].total,
                }) as Standings.Row.Props,
        )
        .sort((a, b) => {
            if (a.topFour === b.topFour) {
                return a.total < b.total ? 1 : -1;
            } else {
                return a.topFour < b.topFour ? 1 : -1;
            }
        });

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell align='right'>Top 4 HRs</TableCell>
                        <TableCell align='right'>Total HRs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => {
                        const { teamKey, teamName, topFour, total } = row;
                        return (
                            <StandingsRow
                                key={teamKey}
                                teamKey={teamKey}
                                teamName={teamName}
                                topFour={topFour}
                                total={total}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
