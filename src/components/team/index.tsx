'use client';
import PlayerHero from '../playerHero';
import { useAppDispatch } from '../../store/hooks';
import { useEffect } from 'react';
import { setSubheader } from '../../store/subheader/slice';
import { LEAGUE_DATA } from '../../constants';
import type { TeamKey } from '../../constants/types';
import type { TeamProps } from './types';

export default function Team({ teamKey }: TeamProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSubheader(LEAGUE_DATA[teamKey as TeamKey].teamName));
  });

  return (
    <div
      className={`
        grid grid-cols-1 w-full md:grid-cols-2 gap-4
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
          playerPageLink
        />
      ))}
    </div>
  );
}
