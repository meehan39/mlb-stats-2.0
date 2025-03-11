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
import React from 'react';

export default function PlayerHero({
  player,
  todaysGame,
  showOwner,
  xl,
  className,
  onClick,
  children,
}: PlayerHeroProps) {
  const isLoading = !player;
  return (
    <div
      onClick={
        onClick !== undefined
          ? () => {
              if (!isLoading && player) {
                onClick && onClick();
              }
            }
          : () => {}
      }
      className={`${onClick ? `clickable-card` : 'card'} w-full h-full grid grid-cols-7 ${xl && 'md:grid-cols-12'} gap-0`}>
      <PlayerImage player={player} isLoading={isLoading} xl={xl} />
      <PlayerInfo
        player={player}
        showOwner={showOwner}
        isLoading={isLoading}
        xl={xl}
        className={className}>
        {children}
      </PlayerInfo>
      <TodaysGame isLoading={isLoading} todaysGame={todaysGame} xl={xl} />
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
    <div className={`col-span-2 ${!xl && 'row-span-2'}  w-full pr-2`}>
      <Image
        src={
          !isLoading && player
            ? PATHS.PLAYER_HERO_IMAGE(player.playerId)
            : '/generic-avatar.PNG'
        }
        alt={player?.fullName ?? 'Generic player avatar'}
        width={128}
        height={221}
        className={`w-full rounded-lg object-cover raised ${isLoading && 'animate-pulse'} ${xl ? 'h-52 md:h-60' : 'h-52 md:h-56'}`}
      />
    </div>
  );
}

function PlayerInfo({
  player,
  showOwner,
  isLoading,
  xl,
  className,
  children,
}: {
  isLoading: boolean;
  player?: PlayerInfo | null;
  showOwner?: boolean;
  xl?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`col-span-5 flex flex-col w-full ${xl && 'md:flex-row gap-3 md:pr-2'}`}>
      <div className='flex flex-col w-full'>
        <div className={`w-full flex flex-col ${xl && 'md:h-full'}`}>
          <div className='flex justify-between text-xl'>
            <Loadable isLoading={isLoading} type='text-xl' width='w-36'>
              <span>{player?.fullName}</span>
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
                <a href={`/team/${player.owner}`}>
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

export function TodaysGame({
  isLoading,
  todaysGame,
  xl = false,
}: {
  isLoading: boolean;
  todaysGame?: PlayerGame | null;
  xl?: boolean;
}) {
  return (
    <Loadable
      isLoading={isLoading}
      type='spinner'
      width='w-10'
      height='h-10'
      className={`
      ${xl ? 'col-span-7 md:col-span-5 pl-0 md:pl-2 pt-2 md:pt-0 border-t mt-2 md:border-t-0 md:mt-0 md:border-l' : 'col-span-5 border-t pt-2'}
      w-full h-full min-h-24 flex flex-col justify-center items-center 
      border-neutral-500/25 dark:border-neutral-400/25`}>
      {todaysGame ? (
        <>
          <div className='flex flex-col h-full w-full justify-center'>
            <div className='text-sm secondary-text whitespace-nowrap flex justify-between w-full'>
              <span>{getGameState(todaysGame)}</span>
              <span>
                {todaysGame.state !== 'scheduled' && !xl
                  ? `${todaysGame.stats.homeRuns ?? 0} HR${todaysGame.stats.homeRuns !== 1 ? 's' : ''}`
                  : todaysGame.location}
              </span>
            </div>
            <div className='text-sm flex flex-col justify-between h-full w-full'>
              <ScoreBugItem
                team={todaysGame.home}
                state={todaysGame.state}
                xl={xl}
              />
              <ScoreBugItem
                team={todaysGame.away}
                state={todaysGame.state}
                xl={xl}
              />
            </div>
          </div>
          {xl && (
            <StatGrid
              isLoading={isLoading}
              columns={3}
              stats={[
                { label: 'HR', value: todaysGame.stats.homeRuns ?? 0 },
                {
                  label: 'H',
                  value: `${todaysGame.stats.hits ?? 0}-${todaysGame.stats.atBats ?? 0}`,
                },
                { label: 'BB', value: todaysGame.stats.baseOnBalls ?? 0 },
                { label: 'K', value: todaysGame.stats.strikeOuts ?? 0 },
                { label: 'RBI', value: todaysGame.stats.rbi ?? 0 },
                { label: 'R', value: todaysGame.stats.runs ?? 0 },
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