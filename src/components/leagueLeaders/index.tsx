'use client';
import axios from '../../utils/axios';
import Subheader from '../subheader';
import Table from '../table';
import { LEAGUE_DATA } from '../../constants';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';

import type LeagueLeaders from '../../app/api/leagueLeaders/types';
import type TableTypes from '../table/types';

export const dynamic = 'force-dynamic';
export default function LeagueLeaders() {
    const timeSpan = useAppSelector(selectTimeSpan);
    const [rows, setRows]: [TableTypes.Row[], any] = useState([]);

    useEffect(() => {
        const fetchPlayer = async () => {
            const { data }: LeagueLeaders.Response = await axios.get(
                `/api/leagueLeaders?timeSpan=${timeSpan}`,
            );
            setRows(
                data.map(({ playerId, fullName, owner, homeRuns }, index) => ({
                    link: `/player/${playerId}`,
                    cells: [
                        index + 1,
                        fullName,
                        owner ? LEAGUE_DATA[owner].teamName : '',
                        homeRuns,
                    ],
                })),
            );
        };
        fetchPlayer();
    }, [timeSpan]);

    return (
        <>
            <Subheader text='League Leaders' />
            <Table
                headers={[
                    { text: 'Rank' },
                    { text: 'Players' },
                    { text: 'Owner' },
                    { text: 'HRs', align: 'right' },
                ]}
                rows={rows}
            />
        </>
    );
}
