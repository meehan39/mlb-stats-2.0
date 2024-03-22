import axios from '../../utils/axios';
import Table from '../table';
import { LEAGUE_DATA } from '../../constants';

import type { TeamKey } from '../../constants/types';
import type Totals from '../../app/api/totals/types';

export default async function Standings() {
    const { data }: Totals.Response = await axios.get(`/api/totals`);
    const rows = (Object.keys(LEAGUE_DATA) as TeamKey[])
        .map(teamKey => ({
            teamKey,
            teamName: LEAGUE_DATA[teamKey].teamName,
            topFour: data[teamKey].topFour,
            total: data[teamKey].total,
        }))
        .sort((a, b) => {
            if (a.topFour === b.topFour) {
                return a.total < b.total ? 1 : -1;
            } else {
                return a.topFour < b.topFour ? 1 : -1;
            }
        });

    return (
        <Table
            headers={[
                { text: 'Team' },
                { text: 'Top 4 HRs', align: 'right' },
                { text: 'Total HRs', align: 'right' },
            ]}
            rows={rows.map(({ teamKey, teamName, topFour, total }) => ({
                link: `/team/${teamKey}`,
                cells: [teamName, topFour, total],
            }))}
        />
    );
}
