'use client';
import PlayerHero from '../playerHero';
import StatGrid from '../statGrid';
import Loadable from '../loadable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTimeSpan } from '../../store/timeSpan/slice';
import { useState, useEffect } from 'react';
import { setSubheader } from '../../store/subheader/slice';
import { useGetPlayerQuery } from '../../store/api/player/query';
import { SEASON, timeSpanValues } from '../../constants';
import type { PlayerProps } from './types';
import type { PlayerStats } from '../../app/api/utils/types';

export default function Player({ playerId }: PlayerProps) {
  const dispatch = useAppDispatch();
  const timeSpan = useAppSelector(selectTimeSpan);
  const { data, isLoading } = useGetPlayerQuery({ playerId, timeSpan });

  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);

  useEffect(() => {
    if (data) {
      const { info, stats } = data;
      setPlayerStats(stats);
      dispatch(setSubheader(info.fullName));
    }
  }, [data]);

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      <PlayerHero
        playerId={playerId}
        showOwner
        xl
        className='w-full flex'
        statsGridItems={data => [
          { label: 'Pos', value: data?.metaData?.primaryPosition ?? '' },
          { label: 'Bats', value: data?.metaData?.bats ?? '' },
          { label: 'Age', value: data?.metaData?.currentAge ?? '' },
          { label: 'Height', value: data?.metaData?.height ?? '' },
          { label: 'Weight', value: data?.metaData?.weight ?? '' },
          {
            label: 'MLB Debut',
            value: data?.metaData?.mlbDebutDate?.slice(0, 4) ?? '',
          },
        ]}
      />
      <div className='w-full flex flex-col gap-4'>
        <span className='text-gray-700 dark:text-gray-400 text-lg'>
          {timeSpan === 'season'
            ? `${SEASON} Season Stats`
            : `${timeSpanValues[timeSpan]} ${SEASON} Stats`}
        </span>
        <div className=' col-span-2 md:col-span-4 w-full flex justify-between card text-2xl px-10 py-5'>
          <span>Home Runs</span>
          <Loadable isLoading={isLoading} type='text-2xl' width='w-10'>
            {playerStats?.homeRuns ?? 0}
          </Loadable>
        </div>
        <StatGrid
          isLoading={isLoading}
          columns={3}
          className='card'
          stats={[
            { label: 'GP', value: playerStats?.gamesPlayed ?? 0 },
            { label: 'AB', value: playerStats?.atBats ?? 0 },
            { label: 'PA', value: playerStats?.plateAppearances ?? 0 },
            { label: 'AVG', value: playerStats?.avg ?? '.000' },
            { label: 'H', value: playerStats?.hits ?? 0 },
            { label: 'R', value: playerStats?.runs ?? 0 },
            { label: 'RBI', value: playerStats?.rbi ?? 0 },
            { label: '2B', value: playerStats?.doubles ?? 0 },
            { label: '3B', value: playerStats?.triples ?? 0 },
            { label: 'BB', value: playerStats?.baseOnBalls ?? 0 },
            { label: 'IBB', value: playerStats?.intentionalWalks ?? 0 },
            { label: 'SO', value: playerStats?.strikeOuts ?? 0 },
            { label: 'OBP', value: playerStats?.obp ?? '.000' },
            { label: 'SLG', value: playerStats?.slg ?? '.000' },
            { label: 'OPS', value: playerStats?.ops ?? '.000' },
          ]}
        />
      </div>
    </div>
  );
}
