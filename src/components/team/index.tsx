'use client';
import Stat from '../stat';
import PlayerHero from '../playerHero';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTimeSpan } from '../../store/timeSpan/slice';
import { useGetTeamStatsQuery } from '../../store/api/team/query';
import { useEffect } from 'react';
import { setSubheader } from '../../store/subheader/slice';
import { LEAGUE_DATA } from '../../constants';
import { useRouter } from 'next/navigation';
import type Team from './types';
import type { TeamKey } from '../../constants/types';

export default function Team({ teamKey }: Team.Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const timeSpan = useAppSelector(selectTimeSpan);
  const { data, isLoading } = useGetTeamStatsQuery({
    teamId: teamKey,
    timeSpan,
  });

  useEffect(() => {
    dispatch(setSubheader(LEAGUE_DATA[teamKey as TeamKey].teamName));
  });

  return (
    <div
      className={`
        grid grid-cols-1 w-full md:grid-cols-2
        gap-4
        
      `}>
      {(data ?? Array.from({ length: 6 })).map((_, i) => (
        <PlayerHero
          key={i}
          player={data?.[i]?.meta}
          todaysGame={data?.[i]?.game}
          className='flex justify-around'
          onClick={() => router.push(`/player/${data?.[i]?.meta.playerId}`)}>
          <Stat
            isLoading={isLoading}
            label='HR'
            value={data?.[i]?.stats?.homeRuns?.toString() ?? '0'}
          />
          <div className='divider-vertical'></div>
          <Stat
            isLoading={isLoading}
            label='GP'
            value={data?.[i]?.stats?.gamesPlayed?.toString() ?? '0'}
          />
          <div className='divider-vertical'></div>
          <Stat
            isLoading={isLoading}
            label='AB'
            value={data?.[i]?.stats?.atBats?.toString() ?? '0'}
          />
        </PlayerHero>
      ))}
    </div>
  );
}
