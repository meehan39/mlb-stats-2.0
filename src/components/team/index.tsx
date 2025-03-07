'use client';
import Stat from '../stat';
import PlayerHero from '../playerHero';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';
import { useGetTeamStatsQuery } from '../../lib/team/query';
import type Team from './types';
import { useEffect } from 'react';
import { setSubheader } from '../../lib/subheader/slice';
import { LEAGUE_DATA } from '../../constants';
import type { TeamKey } from '../../constants/types';

export default function Team({ teamKey }: Team.Props) {
  const dispatch = useAppDispatch();
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
        grid grid-cols-1 w-full md:grid-cols-2 max-w-4xl
        gap-4 p-4
        
      `}>
      {(data ?? Array.from({ length: 6 })).map((_, i) => (
        <PlayerHero key={i} player={data?.[i]} className='flex justify-around'>
          <Stat
            isLoading={isLoading}
            label='HR'
            value={data?.[i]?.homeRuns.toString() ?? ''}
          />
          <div className='divider-vertical'></div>
          <Stat
            isLoading={isLoading}
            label='GP'
            value={data?.[i]?.gamesPlayed.toString() ?? ''}
          />
          <div className='divider-vertical'></div>
          <Stat
            isLoading={isLoading}
            label='AB'
            value={data?.[i]?.atBats.toString() ?? ''}
          />
        </PlayerHero>
      ))}
    </div>
  );
}
