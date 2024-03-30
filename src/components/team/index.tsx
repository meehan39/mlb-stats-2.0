'use client';
import axios from '../../utils/axios';
import Subheader from '../subheader';
import Table from '../table';

import { LEAGUE_DATA } from '../../constants';
import { useAppSelector } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';
import { useEffect, useState } from 'react';

import type Team from './types';
import type TeamApi from '../../app/api/team/[teamKey]/types';
import type TableTypes from '../table/types';
import type { TeamKey } from '../../constants/types';

export default function Team({ teamKey }: Team.Props) {
    const timeSpan = useAppSelector(selectTimeSpan);
    const [rows, setRows]: [TableTypes.Row[], any] = useState([]);

    useEffect(() => {
        const fetchTeam = async () => {
            const { data }: TeamApi.Response = await axios.get(
                `/api/team/${teamKey}?timeSpan=${timeSpan}`,
            );
            setRows(
                data
                    .sort((a, b) => (a.homeRuns < b.homeRuns ? 1 : -1))
                    .map(({ playerId, name, homeRuns }) => ({
                        link: `/player/${playerId}`,
                        cells: [name, homeRuns],
                    })),
            );
        };
        fetchTeam();
    }, [timeSpan, teamKey]);

    return (
        <>
            <Subheader text={LEAGUE_DATA[teamKey as TeamKey].teamName} />
            <Table
                headers={[
                    { text: 'Player' },
                    { text: 'Home Runs', align: 'right' },
                ]}
                rows={rows}
            />
        </>
    );
}
