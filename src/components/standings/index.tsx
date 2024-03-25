import axios from '../../utils/axios';
import Table from '../table';
import Subheader from '../subheader';
import { LEAGUE_DATA } from '../../constants';

import type { TeamKey } from '../../constants/types';
import type Totals from '../../app/api/standings/types';

export default async function Standings() {
try {
    const { data }: Totals.Response = await axios.get(`/api/standings`);
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
        <>
            <Subheader text='Standings' showBack={false} />
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
        </>
    );
} catch (e) {
    return <div>{JSON.stringify(e)}</div>;
}
}
