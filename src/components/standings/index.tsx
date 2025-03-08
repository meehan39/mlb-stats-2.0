'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTimeSpan } from '../../store/timeSpan/slice';
import { setSubheader } from '../../store/subheader/slice';
import { useGetStandingsQuery } from '../../store/api/standings/query';

export const dynamic = 'force-dynamic';
export default function Standings() {
  const dispatch = useAppDispatch();
  dispatch(setSubheader('Standings'));
  const timeSpan = useAppSelector(selectTimeSpan);
  const { data } = useGetStandingsQuery({ timeSpan });

  useEffect(() => {
    console.log(data);
  }, [timeSpan]);

  return <div>{JSON.stringify(data)}</div>;
}
