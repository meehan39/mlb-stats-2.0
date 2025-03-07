'use client';
import type PlayerComponent from '../types';
import Image from 'next/image';
import Loading from '../../loading';
import { LEAGUE_DATA, PATHS } from '../../../constants';
import type { TeamKey } from '../../../constants/types';
import Card from '../card';

export default function Hero({
  loading,
  playerId,
  fullName,
  owner,
  teamName,
  teamId,
  position,
  bats,
  primaryNumber,
  height,
  weight,
  currentAge,
  mlbDebutDate,
}: PlayerComponent.Hero.Props) {
  return (
    <div className='flex w-full justify-center md:justify-start'>
      <div className='my-2 flex max-w-lg flex-row items-stretch rounded-xl px-4 py-4 text-left md:max-w-xl'>
        <div className='flex items-center mr-6'>
          <Image
            src={
              !loading && playerId
                ? PATHS.PLAYER_HERO_IMAGE(playerId)
                : '/generic-avatar.PNG'
            }
            alt={fullName ?? 'Generic player avatar'}
            width={100}
            height={150}
            className='h-56 w-32 rounded-lg object-cover shadow shadow-black/50'
          />
        </div>
        <div className='flex flex-col justify-between gap-2'>
          <div className='flex flex-col gap-1'>
            <Loading isLoading={loading} text='xl' width='w-44 md:w-52'>
              <span className={`text-xl font-medium`}>
                {[fullName, primaryNumber && `#${primaryNumber}`]
                  .filter(Boolean)
                  .join(' ')}
              </span>
            </Loading>
            <Loading isLoading={loading} text='sm' width='w-32'>
              <span className='text-sm font-medium text-gray-700 dark:text-gray-400'>
                {teamName}
              </span>
            </Loading>
            <Loading isLoading={loading} text='sm' width='w-20'>
              <span className='text-sm font-medium text-gray-700 dark:text-gray-400'>
                {owner ? (
                  <a href={`/team/${owner}`} className='underline'>
                    {LEAGUE_DATA[owner as TeamKey].teamName}
                  </a>
                ) : (
                  'Free agent'
                )}
              </span>
            </Loading>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 md:gap-4'>
              <Card label='Team' hidable loading={loading}>
                {teamId && (
                  <Image
                    src={PATHS.TEAM_LOGO(teamId)}
                    alt={teamName ?? ''}
                    width={40}
                    height={40}
                    className='rounded-full h-8 w-8'
                  />
                )}
              </Card>
              <Card label='Position' isText loading={loading}>
                {position}
              </Card>
              <Card label='Bats' isText loading={loading}>
                {bats && bats.slice(0, 1)}
              </Card>
              <Card label='Age' isText loading={loading}>
                {currentAge?.toString()}
              </Card>
            </div>
            <div className='flex gap-2 md:gap-4'>
              <Card label='Height' hidable isText loading={loading}>
                {height}
              </Card>
              <Card label='Weight' hidable isText loading={loading}>
                {weight}
              </Card>
              <Card label='MLB Debut' fillWidth isText loading={loading}>
                {mlbDebutDate && mlbDebutDate.slice(0, 4)}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

