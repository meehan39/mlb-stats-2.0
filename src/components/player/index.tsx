import axios from '../../utils/axios';
import Subheader from '../subheader';
import { LEAGUE_DATA } from '../../constants';
import Table from '../table';

import type PlayerApi from '../../app/api/player/[playerId]/types';
import type PlayerComponent from './types';

export default async function Player({ playerId }: PlayerComponent.Props) {
    const { data }: PlayerApi.Response = await axios.get(
        `/api/player/${playerId}`,
    );

    const owner = data.owner ? LEAGUE_DATA[data.owner].teamName : '';
    return (
        <>
            <Subheader text={data.fullName} />
            <Table
                hideHeader={true}
                headers={[
                    { text: 'category' },
                    { text: 'value', align: 'right' },
                ]}
                rows={[
                    { cells: ['Owner', owner] },
                    { cells: ['HR', data.homeRuns] },
                    { cells: ['Team', data.currentTeam] },
                    { cells: ['Pos', data.position] },
                    { cells: ['Bats', data.bats] },
                    { cells: ['GP', data.gamesPlayed] },
                    { cells: ['AB', data.atBats] },
                    { cells: ['PA', data.plateAppearances] },
                    { cells: ['Hits', data.hits] },
                    { cells: ['Runs', data.runs] },
                    { cells: ['RBI', data.rbi] },
                    { cells: ['Avg', data.avg] },
                    { cells: ['BB', data.baseOnBalls] },
                    { cells: ['2B', data.doubles] },
                    { cells: ['3B', data.triples] },
                    { cells: ['SO', data.strikeOuts] },
                    { cells: ['OBP', data.obp] },
                    { cells: ['SLG', data.slg] },
                    { cells: ['OPS', data.ops] },
                ]}
            />
        </>
    );
}
