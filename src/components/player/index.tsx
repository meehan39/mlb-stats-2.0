'use client';
import axios from '../../utils/axios';
import Subheader from '../subheader';
import Table from '../table';
import { useAppSelector } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';
import { useState, useEffect } from 'react';

import type PlayerApi from '../../app/api/player/[playerId]/types';
import type PlayerComponent from './types';
import type TableTypes from '../table/types';
import Hero from './hero';

export default function Player({ playerId }: PlayerComponent.Props) {
    const timeSpan = useAppSelector(selectTimeSpan);
    const [rows, setRows] = useState<TableTypes.Row[]>([]);
    const [hero, setHero] = useState<PlayerComponent.Hero.Props>({
        loading: true,
    });
    const [subheadertext, setSubheaderText] = useState('');

    useEffect(() => {
        const fetchPlayer = async () => {
            const { data } = await axios.get<PlayerApi.Response>(
                `/api/player/${playerId}?timeSpan=${timeSpan}`,
            );
            setSubheaderText(data.meta.fullName);
            setHero({
                loading: false,
                ...data.meta,
            });
            setRows([
                { cells: ['HR', data?.homeRuns ?? '0'] },
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
            ]);
        };
        fetchPlayer();
    }, [timeSpan, playerId]);

    return (
        <>
            <Subheader text={subheadertext} />
            <Hero {...hero} />
            <Table
                hideHeader={true}
                headers={[
                    { text: 'category' },
                    { text: 'value', align: 'right' },
                ]}
                rows={rows}
                loadingRows={20}
            />
        </>
    );
}
