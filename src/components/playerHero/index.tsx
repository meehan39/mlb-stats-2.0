'use client';
import Image from "next/image";
import Loading from "../loading";
import Spinner from "../spinner";
import { useRouter } from 'next/navigation';
import { PATHS } from "../../constants";

import type TeamApi from '../../app/api/team/[teamKey]/types';
import type PlayerHero from './types';

export default function PlayerHero({player, className, children}: PlayerHero.Props ) {
  const router = useRouter();
  const isLoading = !player;
  return (
    <div
      onClick={() => {
        if (!isLoading && player) {
          router.push(`/player/${player.playerId}`);
        }
      }}
      className={`clickable-card`}>
      <Image
        src={
          !isLoading && player
            ? PATHS.PLAYER_HERO_IMAGE(player.playerId)
            : '/generic-avatar.PNG'
        }
        alt={player?.name ?? 'Generic player avatar'}
        width={100}
        height={150}
        className={`h-56 w-32 rounded-lg object-cover raised ${isLoading && 'animate-pulse'}`}
      />
      <div className='flex flex-col gap-1 w-full'>
        <div className='flex justify-between text-xl'>
          <Loading isLoading={isLoading} text='xl' width='w-36'>
            <span>{player?.name}</span>
          </Loading>
          <Loading isLoading={isLoading} text='xl' width='w-10' align='right'>
            <span className={`secondary-text`}>
              {player?.jerseyNumber && `#${player?.jerseyNumber}`}
            </span>
          </Loading>
        </div>
        <Loading isLoading={isLoading} text='sm' width='w-32'>
          <span className='text-sm font-medium secondary-text'>
            {player?.teamName}
          </span>
        </Loading>
        <div className={`w-full h-full p-2 ${className}`}>{children}</div>
        <div className='h-full flex gap-1 w-full justify-center items-center'>
          {player?.game ? (
            <div className='flex flex-col gap-1 h-full w-full justify-between'>
              <div className='text-sm secondary-text whitespace-nowrap flex justify-between w-full'>
                <span>{getGameState(player?.game)}</span>
                <span>
                  {player.game.state !== 'scheduled' &&
                    `${player.game.homeRuns} HR${player.game.homeRuns !== 1 ? 's' : ''}`}
                </span>
              </div>
              <div className='text-sm flex flex-col gap-1 justify-between h-full w-full'>
                <ScoreBugItem
                  team={player.game.home}
                  state={player.game.state}
                />
                <ScoreBugItem
                  team={player.game.away}
                  state={player.game.state}
                />
              </div>
            </div>
          ) : isLoading ? (
            <Spinner />
          ) : (
            <span className='text-sm secondary-text'>No game today.</span>
          )}
        </div>
      </div>
    </div>
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
          className='rounded-full h-8 w-8 raised'
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