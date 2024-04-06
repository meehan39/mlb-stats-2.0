'use client';
import axios from '../../utils/axios';
import Subheader from '../subheader';
import Table from '../table';

import { LEAGUE_DATA } from '../../constants';
import { useAppSelector } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';
import { useEffect, useState } from 'react';
import { getTodaysGamePromises } from '../../utils';

import type Team from './types';
import type TeamApi from '../../app/api/team/[teamKey]/types';
import type TodaysGame from '../../app/api/todaysGame/[teamId]/types';
import type { PlayerStats } from '../../app/api/utils/types';
import type { TeamKey } from '../../constants/types';

export default function Team({ teamKey }: Team.Props) {
    const timeSpan = useAppSelector(selectTimeSpan);
    const [rows, setRows]: [Team.Row[], any] = useState([]);

    useEffect(() => {
        const fetchTeam = async () => {
            const { data }: TeamApi.Response = await axios.get(
                `/api/team/${teamKey}?timeSpan=${timeSpan}`,
            );
            const sortedData = data.sort((a, b) =>
                a.homeRuns < b.homeRuns ? 1 : -1,
            );
            setRows(getRowsFromData(sortedData));
            if (
                timeSpan === 'season' ||
                timeSpan === (new Date().getMonth() + 1).toString()
            ) {
                const todaysGames = await Promise.all(
                    getTodaysGamePromises(
                        sortedData.map(player => ({
                            teamId: player.teamId,
                            playerId: player.playerId,
                        })),
                    ),
                );
                setRows(getRowsFromData(sortedData, todaysGames));
            }
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

const getRowsFromData = (
    playerStats: PlayerStats[],
    todaysGames: TodaysGame.Data[] | undefined = undefined,
) =>
    playerStats.map(({ playerId, name, homeRuns }, index) => ({
        link: `/player/${playerId}`,
        cells: [
            <PlayerCard
                key={name}
                name={name}
                todaysGame={todaysGames?.[index]}
            />,
            <span key={playerId} className='text-xl'>
                {homeRuns}
            </span>,
        ],
    }));

const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    return `${hours ? hours : 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
};

const getState = (todaysGame: TodaysGame.Game) => {
    switch (todaysGame.state) {
        case 'live':
            return (
                <>
                    <span className='text-green-600 dark:text-green-400'>
                        LIVE
                    </span>
                    <span>{todaysGame.location === 'away' ? `@` : `vs`}</span>
                    <span>{todaysGame.opponent}</span>
                    <span>{todaysGame.score},</span>
                    <span>{todaysGame.homeRuns} HR</span>
                </>
            );
        case 'scheduled':
            return (
                <>
                    <span>{formatTime(todaysGame.startTime)}</span>
                    <span>{todaysGame.location === 'away' ? `@` : `vs`}</span>
                    <span>{todaysGame.opponent}</span>
                </>
            );
        case 'final':
            return (
                <>
                    <span>Final</span>
                    <span>{todaysGame.score}</span>
                    <span>{todaysGame.location === 'away' ? `@` : `vs`}</span>
                    <span>{todaysGame.opponent},</span>
                    <span>{todaysGame.homeRuns} HR</span>
                </>
            );
        default:
            return;
    }
};

function PlayerCard({ name, todaysGame: todaysGame }: Team.PlayerCard.Props) {
    return (
        <div>
            <span className='text-xl'>{name}</span>
            {todaysGame && (
                <div className='flex gap-1'>{getState(todaysGame)}</div>
            )}
        </div>
    );
}
