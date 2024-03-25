import axios from '../../utils/axios';
import Subheader from '../subheader';
import Table from '../table';

import { redirect } from 'next/navigation';
import { LEAGUE_DATA } from '../../constants';

import type { TeamKey } from '../../constants/types';
import type TeamApi from '../../app/api/team/[teamKey]/types';
import type TeamComponent from './types';

export default async function Team({ teamKey }: TeamComponent.Props) {
    const { data }: TeamApi.Response = await axios.get(`/api/team/${teamKey}`);
    data.sort((a, b) => (a.homeRuns < b.homeRuns ? 1 : -1));
    return (
        <>
            <Subheader text={LEAGUE_DATA[teamKey as TeamKey].teamName} />
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
