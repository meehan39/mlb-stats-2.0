'use client';
import Image from "next/image";
import Loadable from '../loadable';
import StatGrid from '../statGrid';
import { LEAGUE_DATA, PATHS } from '../../constants';

import type { PlayerHeroProps } from './types';
import type {
  GameState,
  PlayerGame,
  PlayerInfo,
  TeamData,
} from '../../app/api/utils/types';
import type { TeamKey } from '../../constants/types';
import React, { useEffect } from 'react';
import {
  useLazyGetMonthOverMonthStatsQuery,
  useLazyGetPlayerQuery,
  useLazyGetTodaysGameQuery,
} from '../../store/api/player/query';
import { useAppSelector } from '../../store/hooks';
import { selectTimeSpan } from '../../store/timeSpan/slice';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  Carousel,
  CarouselArrows,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useRouter } from 'next/navigation';

export default function PlayerHero({
  playerId,
  showOwner,
  xl,
  className,
  playerPageLink,
  statsGridItems,
  children,
}: PlayerHeroProps) {
  const timeSpan = useAppSelector(selectTimeSpan);

  const [getPlayer, { data, isLoading }] = useLazyGetPlayerQuery();

  useEffect(() => {
    if (playerId) {
      getPlayer({ playerId, timeSpan });
    }
  }, [playerId, timeSpan]);
  return (
    <div
      className={`card w-full h-full grid grid-cols-7 ${xl && 'md:grid-cols-12'} gap-0`}>
      <PlayerImage
        player={data?.info}
        isLoading={isLoading || !playerId || !data}
        xl={xl}
      />
      <PlayerInfo
        player={data?.info}
        showOwner={showOwner}
        isLoading={isLoading || !playerId || !data}
        xl={xl}
        playerPageLink={playerPageLink}
        className={className}>
        {statsGridItems && (
          <StatGrid
            isLoading={isLoading || !playerId || !data}
            columns={3}
            stats={statsGridItems ? statsGridItems(data) : []}
          />
        )}
        {children}
      </PlayerInfo>

      {xl ? (
        <div
          className={`${xl ? 'col-span-7 md:col-span-5 pl-0 md:pl-2 pt-2 md:pt-0 border-t mt-2 md:border-t-0 md:mt-0 md:border-l' : 'col-span-5 border-t pt-2'} border-neutral-500/25 dark:border-neutral-400/25`}>
          <Carousel
            className='h-full'
            opts={{
              loop: true,
              align: 'center',
              startIndex: timeSpan === 'season' ? 0 : 1,
            }}>
            <CarouselContent className='h-full'>
              <CarouselItem>
                <TodaysGame playerId={playerId} xl={xl} />
              </CarouselItem>
              <CarouselItem>
                <MonthOverMonthHRs playerId={playerId} />
              </CarouselItem>
            </CarouselContent>
            <CarouselArrows />
          </Carousel>
        </div>
      ) : (
        <div className='col-span-5 border-t pt-2 h-24 border-neutral-500/25 dark:border-neutral-400/25'>
          {timeSpan === 'season' ? (
            <TodaysGame playerId={playerId} xl={xl} />
          ) : (
            <MonthOverMonthHRs playerId={playerId} />
          )}
        </div>
      )}
    </div>
  );
}

function PlayerImage({
  player,
  isLoading,
  xl,
}: {
  player?: PlayerInfo | null;
  isLoading: boolean;
  xl?: boolean;
}) {
  return (
    <div
      className={`col-span-2 ${!xl && 'row-span-2'} w-full h-full pr-2 flex items-center justify-center`}>
      <Image
        src={
          !isLoading && player
            ? PATHS.PLAYER_HERO_IMAGE(player.playerId)
            : '/generic-avatar.PNG'
        }
        alt={player?.fullName ?? 'Generic player avatar'}
        width={128}
        height={221}
        className={`w-full rounded-lg object-cover raised ${isLoading && 'animate-pulse'} ${xl ? 'h-52 md:h-60' : ' h-48 sm:h-52 md:h-56'}`}
      />
    </div>
  );
}

function PlayerInfo({
  player,
  showOwner,
  isLoading,
  xl,
  playerPageLink,
  className,
  children,
}: {
  isLoading: boolean;
  player?: PlayerInfo | null;
  showOwner?: boolean;
  xl?: boolean;
  playerPageLink?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div
      className={`col-span-5 flex flex-col w-full ${xl && 'md:flex-row gap-3 md:pr-2'}`}>
      <div className='flex flex-col w-full'>
        <div className={`w-full flex flex-col ${xl && 'md:h-full'}`}>
          <div className='flex justify-between text-xl'>
            <Loadable isLoading={isLoading} type='text-xl' width='w-36'>
              {playerPageLink && player?.playerId ? (
                <a
                  className='cursor-pointer'
                  onClick={() => router.push(`/player/${player?.playerId}`)}>
                  {player?.fullName}
                </a>
              ) : (
                <span>{player?.fullName}</span>
              )}
            </Loadable>
            <Loadable isLoading={isLoading} type='text-xl' width='w-10'>
              <span className='secondary-text'>
                {player?.jerseyNumber && `#${player?.jerseyNumber}`}
              </span>
            </Loadable>
          </div>
          <Loadable isLoading={isLoading} type='text-sm' width='w-32'>
            <span className='secondary-text'>{player?.teamName}</span>
          </Loadable>
          {showOwner && (
            <Loadable
              isLoading={isLoading}
              type='text-sm'
              width='w-24'
              className='secondary-text'>
              {player?.owner ? (
                <a
                  className='cursor-pointer'
                  onClick={() => router.push(`/team/${player.owner}`)}>
                  {LEAGUE_DATA[player.owner as TeamKey].teamName}
                </a>
              ) : (
                <span>Free Agent</span>
              )}
            </Loadable>
          )}
        </div>
        <div className={`h-full w-full ${className}`}>{children}</div>
      </div>
    </div>
  );
}

export function MonthOverMonthHRs({ playerId }: { playerId?: number }) {
  const months = [
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
  ];
  const [getMonthOverMonthStats, { data, isLoading }] =
    useLazyGetMonthOverMonthStatsQuery();

  useEffect(() => {
    if (playerId) {
      getMonthOverMonthStats({ playerId });
    }
  }, [playerId]);
  return (
    <Loadable
      isLoading={isLoading || !playerId}
      type='spinner'
      width='w-10'
      height='h-10'
      className='w-full h-full min-h-24 flex flex-col justify-center items-center'>
      <ChartContainer
        config={{ homeRuns: { label: 'Home Runs' } }}
        className='h-full w-full pt-4 -ml-4'>
        <BarChart
          accessibilityLayer
          data={data?.map((value, index) => ({
            month: months[index],
            homeRuns: value,
          }))}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <XAxis
            dataKey='month'
            tickLine={false}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
          />
          <YAxis
            dataKey='homeRuns'
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            label={{ value: 'HR', angle: -90, position: '' }}
          />
          <Bar key={1} dataKey='homeRuns' radius={4} />
        </BarChart>
      </ChartContainer>
    </Loadable>
  );
}

export function TodaysGame({
  playerId,
  xl = false,
}: {
  playerId?: number;
  xl?: boolean;
}) {
  const [getTodaysGame, { data, isLoading, isUninitialized }] =
    useLazyGetTodaysGameQuery();
  useEffect(() => {
    if (playerId) {
      getTodaysGame({ playerId });
    }
  }, [playerId]);
  return (
    <Loadable
      isLoading={isLoading || !playerId || isUninitialized}
      type='spinner'
      width='w-10'
      height='h-10'
      className='w-full h-full flex flex-col justify-center items-center'>
      {data ? (
        <>
          <div className='flex flex-col h-full w-full justify-center'>
            <div className='text-sm secondary-text whitespace-nowrap flex justify-between w-full'>
              <span>{getGameState(data)}</span>
              <span>
                {data.state !== 'scheduled' && !xl
                  ? `${data.stats.homeRuns ?? 0} HR${data.stats.homeRuns !== 1 ? 's' : ''}`
                  : data.location}
              </span>
            </div>
            <div className='text-sm flex flex-col justify-between h-full w-full'>
              <ScoreBugItem team={data.home} state={data.state} xl={xl} />
              <ScoreBugItem team={data.away} state={data.state} xl={xl} />
            </div>
          </div>
          {xl && (
            <StatGrid
              isLoading={isLoading}
              columns={3}
              stats={[
                { label: 'HR', value: data.stats.homeRuns ?? 0 },
                {
                  label: 'H',
                  value: `${data.stats.hits ?? 0}-${data.stats.atBats ?? 0}`,
                },
                { label: 'BB', value: data.stats.baseOnBalls ?? 0 },
                { label: 'K', value: data.stats.strikeOuts ?? 0 },
                { label: 'RBI', value: data.stats.rbi ?? 0 },
                { label: 'R', value: data.stats.runs ?? 0 },
              ]}
            />
          )}
        </>
      ) : (
        <span className='text-sm secondary-text w-full h-full flex justify-center items-center'>
          No game today.
        </span>
      )}
    </Loadable>
  );
}

export function ScoreBugItem({
  team,
  state,
  xl = false,
}: {
  team: TeamData;
  state?: GameState;
  xl?: boolean;
}) {
  return (
    <div className='flex justify-between'>
      <div className='flex items-center gap-2'>
        <Image
          src={PATHS.TEAM_LOGO(team.id)}
          alt={team.name ?? ''}
          width={40}
          height={40}
          className='rounded-full h-8 w-8 raised'
        />
        <div className='flex flex-col'>
          <span className='flex justify-center items-center'>{team.name}</span>
          {xl && (
            <span className='flex justify-start items-center secondary-text text-xs'>{`${team.record.wins}-${team.record.losses}`}</span>
          )}
        </div>
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

const getGameState = (todaysGame: PlayerGame | null | undefined) => {
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