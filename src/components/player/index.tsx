import axios from '../../utils/axios';
import PlayerRow from './playerRow';
import Subheader from '../subheader';
import { Table, TableBody, TableContainer, Paper } from '@mui/material';
import { LEAGUE_DATA } from '../../constants';

import type PlayerApi from '../../app/api/player/[playerId]/types';
import type PlayerComponent from './types';

export default async function Player({ playerId }: PlayerComponent.Props) {
    const { data } = (await axios.get(
        `/api/player/${playerId}`,
    )) as PlayerApi.Response;

    const owner = data.owner ? LEAGUE_DATA[data.owner].teamName : '';
    return (
        <>
            <Subheader text={data.fullName} />
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <PlayerRow key='owner' category='Owner' value={owner} />
                        <PlayerRow
                            key='homeRuns'
                            category='HR'
                            value={data.homeRuns}
                        />
                        <PlayerRow
                            key='currentTeam'
                            category='Team'
                            value={data.currentTeam}
                        />
                        <PlayerRow
                            key='position'
                            category='Pos'
                            value={data.position}
                        />
                        <PlayerRow
                            key='bats'
                            category='Bats'
                            value={data.bats}
                        />
                        <PlayerRow
                            key='gamesPlayed'
                            category='GP'
                            value={data.gamesPlayed}
                        />
                        <PlayerRow
                            key='atBats'
                            category='AB'
                            value={data.atBats}
                        />
                        <PlayerRow
                            key='plateAppearances'
                            category='PA'
                            value={data.plateAppearances}
                        />
                        <PlayerRow
                            key='hits'
                            category='Hits'
                            value={data.hits}
                        />
                        <PlayerRow
                            key='runs'
                            category='Runs'
                            value={data.runs}
                        />
                        <PlayerRow key='rbi' category='RBI' value={data.rbi} />
                        <PlayerRow key='avg' category='Avg' value={data.avg} />
                        <PlayerRow
                            key='baseOnBalls'
                            category='BB'
                            value={data.baseOnBalls}
                        />
                        <PlayerRow
                            key='doubles'
                            category='2B'
                            value={data.doubles}
                        />
                        <PlayerRow
                            key='triples'
                            category='3B'
                            value={data.triples}
                        />
                        <PlayerRow
                            key='strikeOuts'
                            category='SO'
                            value={data.strikeOuts}
                        />
                        <PlayerRow key='obp' category='OBP' value={data.obp} />
                        <PlayerRow key='slg' category='SLG' value={data.slg} />
                        <PlayerRow key='ops' category='OPS' value={data.ops} />
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
