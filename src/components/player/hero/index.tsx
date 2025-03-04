'use client';
import type PlayerComponent from '../types';
import Image from 'next/image';
import Loading from '../../loading';
import { LEAGUE_DATA, PATHS } from '../../../constants';
import type { TeamKey } from '../../../constants/types';
import type { Text } from '../../loading/types';

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

  function HeroCard({
    label,
    hidable,
    text,
    fillWidth,
    children,
  }: PlayerComponent.Hero.Card.Props) {
    const loadingText: { text: Text; mdText: Text } | null = text
      ? { text: 'xl', mdText: '2xl' }
      : null;
    return (
      <div
        className={`
        ${hidable ? 'hidden md:flex' : 'flex'}
        ${fillWidth ? 'md:w-full' : 'md:w-auto'}
        h-20 w-full md:w-auto
        flex-col justify-center gap-2 items-center
        rounded-xl p-2 md:px-4 whitespace-nowrap
        bg-slate-200 dark:bg-slate-800
        shadow-black/50
        shadow
      `}>
        <span className='text-sm font-medium'>{label}</span>
        <Loading
          isLoading={loading}
          text={text ? loadingText?.text : undefined}
          mdText={text ? loadingText?.mdText : undefined}
          height={!text ? 'h-10' : undefined}
          width='w-full'>
          {text ? (
            <span className='text-xl md:text-2xl'>{children}</span>
          ) : (
            children
          )}
        </Loading>
      </div>
    );
  }

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
                {owner && LEAGUE_DATA[owner as TeamKey].teamName}
              </span>
            </Loading>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 md:gap-4'>
              <HeroCard label='Team' hidable>
                {teamId && (
                  <Image
                    src={PATHS.TEAM_LOGO(teamId)}
                    alt={teamName ?? ''}
                    width={40}
                    height={40}
                    className='rounded-full h-8 w-8'
                  />
                )}
              </HeroCard>
              <HeroCard label='Position' text>
                {position}
              </HeroCard>
              <HeroCard label='Bats' text>
                {bats && bats.slice(0, 1)}
              </HeroCard>
              <HeroCard label='Age' text>
                {currentAge?.toString()}
              </HeroCard>
            </div>
            <div className='flex gap-2 md:gap-4'>
              <HeroCard label='Height' hidable text>
                {height}
              </HeroCard>
              <HeroCard label='Weight' hidable text>
                {weight}
              </HeroCard>
              <HeroCard label='MLB Debut' fillWidth text>
                {mlbDebutDate && mlbDebutDate.slice(0, 4)}
              </HeroCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

