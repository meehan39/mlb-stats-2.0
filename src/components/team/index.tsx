'use client';
import axios from '../../utils/axios';
import Subheader from '../subheader';
import Table from '../table';
import Loading from '../loading';

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
  function PlayerCard({ name, todaysGame }: Team.PlayerCard.Props) {
    return (
      <div className='flex flex-col items-start gap-1'>
        <span className='text-xl'>{name}</span>
        <Loading isLoading={todaysGames.length === 0} text='sm' width='w-full'>
          {(timeSpan === 'season' || timeSpan === nextMonth) &&
            getState(todaysGame)}
        </Loading>
      </div>
    );
  }

  const timeSpan = useAppSelector(selectTimeSpan);
  const nextMonth = (new Date().getMonth() + 1).toString();
  const [rows, setRows]: [Team.Row[], any] = useState([]);
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [todaysGames, setTodaysGames] = useState<TodaysGame.Data[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      // Fetch team data
      const { data }: TeamApi.Response = await axios.get(
        `/api/team/${teamKey}?timeSpan=${timeSpan}`,
      );
      const sortedData = data.sort((a, b) =>
        a.homeRuns < b.homeRuns ? 1 : -1,
      );
      setPlayerStats(sortedData);

      // If timespan is 'season' or current month, fetch today's games
      if (
        timeSpan === 'season' ||
        timeSpan === nextMonth ||
        todaysGames.length > 0
      ) {
        const todaysGameResponse = await Promise.all(
          getTodaysGamePromises(
            sortedData.map(player => ({
              teamId: player.teamId,
              playerId: player.playerId,
            })),
          ),
        );
        setTodaysGames(todaysGameResponse);
      }
    };
    fetchTeam();
  }, [timeSpan, teamKey]);

  useEffect(() => {
    setRows(
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
      })),
    );
  }, [playerStats, todaysGames]);

  return (
    <>
      <Subheader text={LEAGUE_DATA[teamKey as TeamKey].teamName} />
      <Table
        headers={[{ text: 'Player' }, { text: 'Home Runs', align: 'right' }]}
        rows={rows}
        loadingRows={6}
      />
    </>
  );
}

const formatTime = (timeStr: string) => {
  const date = new Date(timeStr);
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'pm' : 'am';

  return `${hours ? hours : 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
};

const getState = (todaysGame: TodaysGame.Game | null | undefined) => {
  console.log(todaysGame);
  switch (todaysGame?.state) {
    case 'live':
      return (
        <span>
          <span className='text-green-600 dark:text-green-400'>LIVE</span>
          <span>{todaysGame.location === 'away' ? `@` : `vs`}</span>
          <span>{todaysGame.opponent}</span>
          <span>{todaysGame.score},</span>
          <span>{todaysGame.homeRuns} HR</span>
        </span>
      );
    case 'scheduled':
      return (
        <span>
          <span>{formatTime(todaysGame.startTime)}</span>
          <span>{todaysGame.location === 'away' ? `@` : `vs`}</span>
          <span>{todaysGame.opponent}</span>
        </span>
      );
    case 'final':
      return (
        <span className='flex gap-1'>
          <span>Final</span>
          <span>{todaysGame.score}</span>
          <span>{todaysGame.location === 'away' ? `@` : `vs`}</span>
          <span>{todaysGame.opponent},</span>
          <span>{todaysGame.homeRuns} HR</span>
        </span>
      );
    default:
      return <span>No games today.</span>;
  }
};
