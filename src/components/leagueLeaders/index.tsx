'use client';
import axios from '../../utils/axios';
import Table from '../table';
import { LEAGUE_DATA } from '../../constants';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectTimeSpan } from '../../lib/timeSpan/slice';

import type LeagueLeaders from '../../app/api/leagueLeaders/types';
import type TableTypes from '../table/types';
import { setSubheader } from '../../lib/subheader/slice';

export const dynamic = 'force-dynamic';
export default function LeagueLeaders() {
  const dispatch = useAppDispatch();
  const timeSpan = useAppSelector(selectTimeSpan);
  const [rows, setRows]: [TableTypes.Row[], any] = useState([]);
  dispatch(setSubheader('League Leaders'));

  useEffect(() => {
    const fetchLeagueLeaders = async () => {
      const { data }: LeagueLeaders.Response = await axios.get(
        `/api/leagueLeaders?timeSpan=${timeSpan}`,
      );
      setRows(
        data.map(({ playerId, fullName, owner, homeRuns }, index) => ({
          link: `/player/${playerId}`,
          cells: [
            index + 1,
            fullName,
            owner ? LEAGUE_DATA[owner].teamName : '',
            homeRuns,
          ],
        })),
      );
    };
    fetchLeagueLeaders();
  }, [timeSpan]);

  return (
    <Table
      headers={[
        { text: 'Rank' },
        { text: 'Players' },
        { text: 'Owner' },
        { text: 'HRs', align: 'right' },
      ]}
      rows={rows}
      loadingRows={20}
    />
  );
}
