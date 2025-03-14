'use client';
import PlayerHero from '../playerHero';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTimeSpan } from '../../store/timeSpan/slice';
import { setSubheader } from '../../store/subheader/slice';
import { useGetLeagueLeadersQuery } from '../../store/api/leagueLeaders/query';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';
export default function LeagueLeaders() {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
      loader={<Loader />}
      className='flex flex-col gap-4'>
      {leagueLeaders.map((playerId, index) => {
        return (
          <PlayerHero
            key={index}
            playerId={playerId}
            onClick={() => router.push(`/player/${playerId}`)}
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
        );
      })}
    </InfiniteScroll>
  );
}

function Loader() {
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
      <PlayerHero xl statsGridItems={statsGrid} />
      <PlayerHero xl statsGridItems={statsGrid} />
      <PlayerHero xl statsGridItems={statsGrid} />
      <PlayerHero xl statsGridItems={statsGrid} />
      <PlayerHero xl statsGridItems={statsGrid} />
    </div>
  );
}
