'use client';
import PlayerHero from '../playerHero';
import StatGrid from '../statGrid';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTimeSpan } from '../../store/timeSpan/slice';
import { useGetTeamStatsQuery } from '../../store/api/team/query';
import { useEffect } from 'react';
import { setSubheader } from '../../store/subheader/slice';
import { LEAGUE_DATA } from '../../constants';
import { useRouter } from 'next/navigation';
import type { TeamKey } from '../../constants/types';
import type { TeamProps } from './types';

export default function Team({ teamKey }: TeamProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setSubheader(LEAGUE_DATA[teamKey as TeamKey].teamName));
  });

  return (
    <div
      className={`
        grid grid-cols-1 w-full md:grid-cols-2
        gap-4
        
      `}>
      {LEAGUE_DATA[teamKey as TeamKey].roster.map((player, i) => (
        <PlayerHero
          key={i}
          playerId={player.id}
          className='flex justify-around'
          statsGridItems={data => [
            { label: 'HR', value: data?.stats?.homeRuns ?? 0 },
            { label: 'GP', value: data?.stats?.gamesPlayed ?? 0 },
            { label: 'AB', value: data?.stats?.atBats ?? 0 },
          ]}
          onClick={() => {
            dispatch(setSubheader(player.name));
            return router.push(`/player/${player.id}`);
          }}
        />
      ))}
    </div>
  );
}
