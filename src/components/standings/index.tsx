'use client';
import Table from '../table';
import Subheader from '../subheader';
import axios from '../../utils/axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';
import { LEAGUE_DATA } from '../../constants';

import type { TeamKey } from '../../constants/types';
import type Standings from './types';
import type StandingsApi from '../../app/api/standings/types';
import type TableTypes from '../table/types';

export default function Standings() {
    const timeSpan = useAppSelector(selectTimeSpan);
    const [rows, setRows]: [TableTypes.Row[], any] = useState([]);

    useEffect(() => {
        const fetchStandings = async () => {
            const { data }: StandingsApi.Response = await axios.get(
                `/api/standings?timeSpan=${timeSpan}`,
            );
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
                })
                .map(({ teamKey, teamName, topFour, total }, index) => ({
                    link: `/team/${teamKey}`,
                    cells: [index + 1, teamName, topFour, total],
                }));
            setRows(rows);
        };
        fetchStandings();
    }, [timeSpan]);

    return (
        <>
            <Subheader text='Standings' showBack={false} />
            <Table
                headers={[
                    { text: 'Rank', sort: true },
                    { text: 'Team' },
                    { text: 'Top 4', align: 'right', sort: true },
                    { text: 'Total', align: 'right', sort: true },
                ]}
                rows={rows}
            />
        </>
    );
}
