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
import LeagueLeaderRow from './leagueLeaderRow';
import Subheader from '../subheader';

import type LeagueLeaders from './types';
import type LeagueLeadersApi from '../../app/api/leagueLeaders/types';

export default async function LeagueLeaders() {
    const { data }: LeagueLeadersApi.Response =
        await axios.get('/api/leagueLeaders');
    // try {
    //         return <div>{JSON.stringify(data)}</div>;
    // } catch (e) {
    //     return <div>{JSON.stringify(e)}</div>;
    // }

    return (
        <>
            <Subheader text='League Leaders' />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Player</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell align='right'>Home Runs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(({ playerId, fullName, owner, homeRuns }) => (
                            <LeagueLeaderRow
                                key={playerId}
                                playerId={playerId}
                                fullName={fullName}
                                teamKey={owner}
                                homeRuns={homeRuns}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
