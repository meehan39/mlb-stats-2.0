'use client';
import axios from '../../utils/axios';
import Subheader from '../subheader';
import Stats from './stats';
import { useAppSelector } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';
import { useState, useEffect } from 'react';

import type PlayerApi from '../../app/api/player/[playerId]/types';
import type PlayerComponent from './types';
import type TableTypes from '../table/types';
import Hero from './hero';

export default function Player({ playerId }: PlayerComponent.Props) {
  const timeSpan = useAppSelector(selectTimeSpan);
  const [stats, setStats] = useState<PlayerComponent.Stats.Props>({
    loading: true,
  });
  const [hero, setHero] = useState<PlayerComponent.Hero.Props>({
    loading: true,
  });
  const [subheadertext, setSubheaderText] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      const { data } = await axios.get<PlayerApi.Response>(
        `/api/player/${playerId}?timeSpan=${timeSpan}`,
      );
      const { meta, ...stats } = data;
      setSubheaderText(meta.fullName);
      setHero({
        loading: false,
        ...meta,
      });
      setStats({
        loading: false,
        ...stats,
      });
    };
    fetchPlayer();
  }, [timeSpan, playerId]);

  return (
    <>
      <Subheader text={subheadertext} />
      <div className='flex flex-col items-center gap-4 w-full max-w-4xl'>
        <Hero {...hero} />
        <Stats {...stats} />
      </div>
    </>
  );
}
