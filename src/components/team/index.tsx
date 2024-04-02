'use client';
import axios from '../../utils/axios';
import Subheader from '../subheader';
import Table from '../table';

import { LEAGUE_DATA } from '../../constants';
import { useAppSelector } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';
import { useEffect, useState } from 'react';
import { getNextGamePromises } from '../../utils';

import type Team from './types';
import type TeamApi from '../../app/api/team/[teamKey]/types';
import type TableTypes from '../table/types';
import type NextGame from '../../app/api/nextGame/[teamId]/types';
import type { PlayerStats } from '../../app/api/utils/types';
import type { TeamKey } from '../../constants/types';

export default function Team({ teamKey }: Team.Props) {
    const timeSpan = useAppSelector(selectTimeSpan);
    const [rows, setRows]: [TableTypes.Row[], any] = useState([]);

    useEffect(() => {
        const fetchTeam = async () => {
            const { data }: TeamApi.Response = await axios.get(
                `/api/team/${teamKey}?timeSpan=${timeSpan}`,
            );
            setRows(getRowsFromData(data));
            if (timeSpan === 'season') {
                const nextGames = await Promise.all(
                    getNextGamePromises(data.map(player => player.teamId)),
                );
                setRows(getRowsFromData(data, nextGames));
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
    nextGames: NextGame.Data[] | undefined = undefined,
) =>
    playerStats
        .sort((a, b) => (a.homeRuns < b.homeRuns ? 1 : -1))
        .map(({ playerId, name, homeRuns }, index) => ({
            link: `/player/${playerId}`,
            cells: [
                <PlayerCard
                    key={name}
                    name={name}
                    nextGame={nextGames?.[index]}
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

function PlayerCard({ name, nextGame }: Team.PlayerCard.Props) {
    return (
        <div>
            <span className='text-xl'>{name}</span>
            {nextGame && (
                <div className='flex gap-1'>
                    {nextGame.state === 'live' ? (
                        <>
                            <span className='text-green-600 dark:text-green-400'>
                                LIVE
                            </span>
                            <span>
                                {nextGame.location === 'away' ? `@` : `vs`}
                            </span>
                            <span>{nextGame.opponent}</span>
                            <span>{nextGame.score}</span>
                        </>
                    ) : (
                        <>
                            <span>{formatTime(nextGame.startTime)}</span>
                            <span>
                                {nextGame.location === 'away' ? `@` : `vs`}
                            </span>
                            <span>{nextGame.opponent}</span>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
