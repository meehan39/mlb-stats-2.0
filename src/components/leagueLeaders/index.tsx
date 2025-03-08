'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTimeSpan } from '../../store/timeSpan/slice';
import { setSubheader } from '../../store/subheader/slice';
import { useGetLeagueLeadersQuery } from '../../store/api/leagueLeaders/query';

export const dynamic = 'force-dynamic';
export default function LeagueLeaders() {
  const dispatch = useAppDispatch();
  dispatch(setSubheader('League Leaders'));
  const timeSpan = useAppSelector(selectTimeSpan);
  const { data } = useGetLeagueLeadersQuery({ timeSpan });

  useEffect(() => {
    console.log(data);
  }, [timeSpan]);

  return <div>{JSON.stringify(data)}</div>;
}
