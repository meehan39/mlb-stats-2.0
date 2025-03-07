'use client';
import Subheader from '../subheader';
import Loading from '../loading';

import { LEAGUE_DATA, PATHS } from '../../constants';
import { useAppSelector } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';
import { useEffect } from 'react';

import type Team from './types';
import type TeamApi from '../../app/api/team/[teamKey]/types';
import type { TeamKey } from '../../constants/types';
import { useGetTeamStatsQuery } from '../../lib/team/query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Stat from '../stat';

export default function Team({ teamKey }: Team.Props) {
  const router = useRouter();
  const timeSpan = useAppSelector(selectTimeSpan);
  const { data, isLoading } = useGetTeamStatsQuery({
    teamId: teamKey,
    timeSpan,
  });

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <>
      <Subheader text={LEAGUE_DATA[teamKey as TeamKey].teamName} />
      <div
        className={`
        grid grid-cols-1 w-full md:grid-cols-2 max-w-4xl
        gap-4 p-4
        
      `}>
        {(data ?? Array.from({ length: 6 })).map((_, i) => (
          <div
            key={i}
            onClick={() => {
              if (!isLoading && data?.[i]) {
                router.push(`/player/${data[i].playerId}`);
              }
            }}
            className={`clickable-card`}>
            <Image
              src={
                !isLoading && data?.[i]
                  ? PATHS.PLAYER_HERO_IMAGE(data[i].playerId)
                  : '/generic-avatar.PNG'
              }
              alt={data?.[i]?.name ?? 'Generic player avatar'}
              width={100}
              height={150}
              className='h-56 w-32 rounded-lg object-cover shadow shadow-black/50'
            />
            <div className='flex flex-col gap-1 w-full'>
              <Loading isLoading={isLoading} text='xl' width='w-44 md:w-52'>
                <span className={`text-xl font-medium`}>
                  {/* {[data[i].name, primaryNumber && `#${primaryNumber}`] */}
                  {data?.[i].name}
                </span>
              </Loading>
              <Loading isLoading={isLoading} text='sm' width='w-32'>
                <span className='text-sm font-medium secondary-text'>
                  {data?.[i].teamName}
                </span>
              </Loading>
              <div className='flex gap-2 w-full justify-around p-2'>
                <Stat
                  isLoading={isLoading}
                  label='HR'
                  value={data?.[i].homeRuns}
                />
                <div className='divider-vertical'></div>
                <Stat
                  isLoading={isLoading}
                  label='GP'
                  value={data?.[i].gamesPlayed}
                />
                <div className='divider-vertical'></div>
                <Stat
                  isLoading={isLoading}
                  label='AB'
                  value={data?.[i].atBats}
                />
              </div>
              <div className='divider-horizontal'></div>
              <div className='h-full flex gap-1 w-full justify-center items-center'>
                {data?.[i].game ? (
                  <div className='flex flex-col h-full w-full justify-between'>
                    <div className='text-sm secondary-text whitespace-nowrap flex justify-between w-full'>
                      <span>{getGameState(data?.[i].game)}</span>
                      <span>
                        {data?.[i].game.state !== 'scheduled' &&
                          `${data?.[i].game.homeRuns} HR${data?.[i].game.homeRuns !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                    <div className='text-sm flex flex-col justify-between h-full w-full py-1'>
                      <ScoreBugItem
                        team={data?.[i].game.home}
                        state={data?.[i].game.state}
                      />
                      <ScoreBugItem
                        team={data?.[i].game.away}
                        state={data?.[i].game.state}
                      />
                    </div>
                  </div>
                ) : (
                  <span className='text-sm secondary-text'>No game today.</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function ScoreBugItem({
  team,
  state,
}: {
  team: TeamApi.TeamData;
  state?: TeamApi.GameState;
}) {
  return (
    <div className='flex justify-between'>
      <div className='flex gap-2'>
        <Image
          src={PATHS.TEAM_LOGO(team.id)}
          alt={team.name ?? ''}
          width={40}
          height={40}
          className='rounded-full h-8 w-8'
        />
        <span className='flex justify-center items-center'>{team.name}</span>
      </div>
      <span className='flex justify-center items-center'>
        {state !== 'scheduled' && team.score}
      </span>
    </div>
  );
}

const formatTime = (timeStr: string) => {
  const date = new Date(timeStr);
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'pm' : 'am';

  return `${hours ? hours : 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
};

const getGameState = (todaysGame: TeamApi.Game | null | undefined) => {
  switch (todaysGame?.state) {
    case 'live':
      return 'LIVE';
    case 'scheduled':
      return formatTime(todaysGame.startTime);
    case 'final':
      return 'Final';
    default:
      return;
  }
};
