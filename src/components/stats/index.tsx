import axios from '../../utils/axios';
import Subheader from '../subheader';
import Table from '../table';

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
    const { data }: Team.Response = await axios.get(`/api/team/${teamKey}`);
    data.sort((a, b) => (a.homeRuns < b.homeRuns ? 1 : -1));
    return (
        <>
            <Subheader text={LEAGUE_DATA[teamKey].teamName} />
            <Table
                headers={[
                    { text: 'Player' },
                    { text: 'Home Runs', align: 'right' },
                ]}
                rows={data.map(({ playerId, name, homeRuns }) => ({
                    link: `/player/${playerId}`,
                    cells: [name, homeRuns],
                }))}
            />
        </>
    );
}
