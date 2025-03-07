'use client';
import Table from '../table';
import axios from '../../utils/axios';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';
import { LEAGUE_DATA } from '../../constants';

import type { TeamKey } from '../../constants/types';
import type Standings from './types';
import type StandingsApi from '../../app/api/standings/types';
import type TableTypes from '../table/types';
import { setSubheader } from '../../lib/subheader/slice';

export default function Standings() {
  const dispatch = useAppDispatch();
  dispatch(setSubheader('Standings'));
  const timeSpan = useAppSelector(selectTimeSpan);
  const [rows, setRows]: [TableTypes.Row[], any] = useState([]);

  const sortRows = (
    unsortedRows: TableTypes.Row[],
    primary: number,
    secondary: number,
  ) =>
    structuredClone(
      unsortedRows.sort((a, b) => {
        if (a.cells[primary] === b.cells[primary]) {
          return a.cells[secondary] < b.cells[secondary] ? 1 : -1;
        } else {
          return a.cells[primary] < b.cells[primary] ? 1 : -1;
        }
      }),
    );

  useEffect(() => {
    const fetchStandings = async () => {
      const { data }: StandingsApi.Response = await axios.get(
        `/api/standings?timeSpan=${timeSpan}`,
      );
      const dataRows = (Object.keys(LEAGUE_DATA) as TeamKey[]).map(teamKey => ({
        link: `/team/${teamKey}`,
        cells: [
          LEAGUE_DATA[teamKey].teamName,
          data[teamKey].topFour,
          data[teamKey].total,
        ],
      }));
      console.log(dataRows);
      setRows(
        sortRows(dataRows, 1, 2).map(({ link, cells }, index) => ({
          link,
          cells: [index + 1, ...cells],
        })),
      );
    };
    fetchStandings();
  }, [timeSpan]);

  const topFourSort = () => {
    setRows(sortRows(rows, 2, 3));
  };
  const totalSort = () => {
    setRows(sortRows(rows, 3, 2));
  };

  return (
    <Table
      headers={[
        { text: 'Rank', sort: topFourSort },
        { text: 'Team' },
        { text: 'Top 4', align: 'right', sort: topFourSort },
        { text: 'Total', align: 'right', sort: totalSort },
      ]}
      rows={rows}
      loadingRows={Object.keys(LEAGUE_DATA).length}
    />
  );
}
