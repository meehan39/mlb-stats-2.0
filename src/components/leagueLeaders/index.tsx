import axios from '../../utils/axios';
import Subheader from '../subheader';
import Table from '../table';
import { LEAGUE_DATA } from '../../constants';

import type LeagueLeaders from '../../app/api/leagueLeaders/types';

export default async function LeagueLeaders() {
    const { data }: LeagueLeaders.Response =
        await axios.get('/api/leagueLeaders');

    return (
        <>
            <Subheader text='League Leaders' />
            <Table
                headers={[
                    { text: 'Players' },
                    { text: 'Owner' },
                    { text: 'HRs', align: 'right' },
                ]}
                rows={data.map(({ playerId, fullName, owner, homeRuns }) => ({
                    link: `/player/${playerId}`,
                    cells: [
                        fullName,
                        owner ? LEAGUE_DATA[owner].teamName : '',
                        homeRuns,
                    ],
                }))}
            />
        </>
    );
}
