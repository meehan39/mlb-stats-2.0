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

    const owner = data.owner ? LEAGUE_DATA[data.owner].teamName : 'None';
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
                    {
                        cells: ['Owner', owner],
                        link: data.owner ? `/team/${data.owner}` : undefined,
                    },
                    { cells: ['HR', data?.homeRuns ?? '0'] },
                    { cells: ['Team', data?.currentTeam ?? ''] },
                    { cells: ['Pos.', data?.position ?? ''] },
                    { cells: ['Bats', data?.bats ?? ''] },
                    { cells: ['GP', data?.gamesPlayed ?? '0'] },
                    { cells: ['AB', data?.atBats ?? '0'] },
                    { cells: ['PA', data?.plateAppearances ?? '0'] },
                    { cells: ['Hits', data?.hits ?? '0'] },
                    { cells: ['Runs', data?.runs ?? '0'] },
                    { cells: ['RBI', data?.rbi ?? '0'] },
                    { cells: ['Avg.', data?.avg ?? '.000'] },
                    { cells: ['BB', data?.baseOnBalls ?? '0'] },
                    { cells: ['2B', data?.doubles ?? '0'] },
                    { cells: ['3B', data?.triples ?? '0'] },
                    { cells: ['SO', data?.strikeOuts ?? '0'] },
                    { cells: ['OBP', data?.obp ?? '.000'] },
                    { cells: ['SLG', data?.slg ?? '.000'] },
                    { cells: ['OPS', data?.ops ?? '.000'] },
                ]}
            />
        </>
    );
}
