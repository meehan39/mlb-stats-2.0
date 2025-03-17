'use client';
import Table from '../table';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTimeSpan } from '../../store/timeSpan/slice';
import { setSubheader } from '../../store/subheader/slice';
import { useGetStandingsQuery } from '../../store/api/standings/query';
import { LEAGUE_DATA } from '../../constants';
import Tabs from '../tabs';
import type { Row } from '../table/types';
import type { TeamKey } from '../../constants/types';

export const dynamic = 'force-dynamic';
export default function Standings() {
  const dispatch = useAppDispatch();
  const timeSpan = useAppSelector(selectTimeSpan);
  const { data } = useGetStandingsQuery({ timeSpan });
  const [rows, setRows] = useState<Row[]>([]);
  const [showTotal, setShowTotal] = useState(false);

  useEffect(() => {
    dispatch(
      setSubheader(
        <Tabs
          tabs={[
            { name: 'Top 4', onClick: () => setShowTotal(false) },
            { name: 'Total', onClick: () => setShowTotal(true) },
          ]}
          defaultTab={0}
        />,
      ),
    );
    if (data) {
      setRows(
        data.map(({ ranking, teamKey, total, topFour }) => {
          const teamName = LEAGUE_DATA[teamKey as TeamKey].teamName;
          const { homeRuns, games, hits, atBats } = showTotal ? total : topFour;
          return {
            cells: [
              ranking,
              teamName,
              homeRuns,
              formatRate(homeRuns, games),
              formatRate(homeRuns, hits),
              formatRate(homeRuns, atBats),
            ],
            link: `/team/${teamKey}`,
          };
        }),
      );
    }
  }, [data, showTotal]);

  return (
    <Table
      headers={[
        {
          align: 'center',
          className: 'bg-slate-300 dark:bg-slate-700/50 w-min',
          loadingWidth: 'w-3',
        },
        {
          className: 'bg-slate-300 dark:bg-slate-700/50 w-min',
          loadingWidth: 'w-20',
        },
        { text: 'HR', align: 'right', className: 'w-full' },
        { text: 'HR/GP', align: 'right', loadingWidth: 'w-11' },
        { text: 'HR/H', align: 'right', loadingWidth: 'w-11' },
        { text: 'HR/AB', align: 'right', loadingWidth: 'w-11' },
      ]}
      rows={rows ?? []}
      loadingRows={13}
      defaultSortIndex={2}
    />
  );
}

const formatRate = (homeruns: number, control: number) => {
  return homeruns && control
    ? `${((homeruns / control) * 100).toFixed(1)}%`
    : '0%';
};
