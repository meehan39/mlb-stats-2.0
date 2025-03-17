'use client';
import PlayerHero from '../playerHero';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTimeSpan } from '../../store/timeSpan/slice';
import { setSubheader } from '../../store/subheader/slice';
import { useGetLeagueLeadersQuery } from '../../store/api/leagueLeaders/query';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';
export default function LeagueLeaders() {
  const dispatch = useAppDispatch();
  const timeSpan = useAppSelector(selectTimeSpan);
  const [offset, setOffset] = useState(0);

  const { data } = useGetLeagueLeadersQuery({ timeSpan, offset });
  const [leagueLeaders, setLeagueLeaders] = useState<(number | undefined)[]>(
    [],
  );

  useEffect(() => {
    setLeagueLeaders([]);
    setOffset(0);
  }, [timeSpan]);

  useEffect(() => {
    dispatch(setSubheader('League Leaders'));
    if (data && offset >= leagueLeaders.length) {
      const allLeaders = structuredClone(leagueLeaders).concat(
        data.map(({ playerId }) => playerId),
      );
      setLeagueLeaders(allLeaders);
    }
  }, [data]);

  return (
    <InfiniteScroll
      dataLength={leagueLeaders.length}
      next={() => setOffset(leagueLeaders.length)}
      hasMore={Boolean(data?.length) || !leagueLeaders.length}
      loader={<Loader offset={offset} />}
      className='flex flex-col gap-4'>
      {leagueLeaders.map((playerId, index) => {
        return (
          <React.Fragment key={index}>
            <Divider index={index} />
            <PlayerHero
              playerId={playerId}
              playerPageLink
              xl
              showOwner
              statsGridItems={data => {
                const { homeRuns, hits, runs, rbi, atBats, avg } =
                  data?.stats ?? {};
                return [
                  { label: 'HR', value: homeRuns ?? 0 },
                  { label: 'H', value: hits ?? 0 },
                  { label: 'R', value: runs ?? 0 },
                  { label: 'RBI', value: rbi ?? 0 },
                  { label: 'AB', value: atBats ?? 0 },
                  { label: 'AVG', value: avg ?? '.000' },
                ];
              }}
            />
          </React.Fragment>
        );
      })}
    </InfiniteScroll>
  );
}

function Loader({ offset }: { offset: number }) {
  const statsGrid = () => [
    { label: 'HR', value: 0 },
    { label: 'H', value: 0 },
    { label: 'R', value: 0 },
    { label: 'RBI', value: 0 },
    { label: 'AB', value: 0 },
    { label: 'AVG', value: '.000' },
  ];
  return (
    <div className='flex flex-col gap-4'>
      {new Array(5).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <Divider index={offset + index} />
          <PlayerHero key={index} xl statsGridItems={statsGrid} showOwner />
        </React.Fragment>
      ))}
    </div>
  );
}

function Divider({ index }: { index: number }) {
  return (
    <div className='flex items-center gap-2 secondary-text'>
      <span>{index + 1}</span>
      <div className='h-px w-full bg-gray-700 dark:bg-gray-400' />
    </div>
  );
}
