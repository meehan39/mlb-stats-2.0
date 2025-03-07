'use client';
import axios from '../../utils/axios';
import Subheader from '../subheader';
import Stats from './stats';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';
import { useState, useEffect, use } from 'react';

import type PlayerApi from '../../app/api/player/[playerId]/types';
import type PlayerComponent from './types';
import type TableTypes from '../table/types';
import Hero from './hero';
import { setSubheader } from '../../lib/subheader/slice';

export default function Player({ playerId }: PlayerComponent.Props) {
  const dispatch = useAppDispatch();
  const timeSpan = useAppSelector(selectTimeSpan);
  const [stats, setStats] = useState<PlayerComponent.Stats.Props>({
    loading: true,
  });
  const [hero, setHero] = useState<PlayerComponent.Hero.Props>({
    loading: true,
  });

  useEffect(() => {
    const fetchPlayer = async () => {
      dispatch(setSubheader(null));
      const { data } = await axios.get<PlayerApi.Response>(
        `/api/player/${playerId}?timeSpan=${timeSpan}`,
      );
      const { meta, ...stats } = data;
      dispatch(setSubheader(meta.fullName));
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
    <div className='flex flex-col items-center gap-4 w-full max-w-4xl'>
      <Hero {...hero} />
      <Stats {...stats} />
    </div>
  );
}
