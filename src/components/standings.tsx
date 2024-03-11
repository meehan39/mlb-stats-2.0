import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';

import { LEAGUE_DATA } from "../constants";

import type { TeamKey } from "../app/types";
import type { ResponseData, TotalHomeRuns } from "../app/api/totals/types";

interface TRow {
    teamKey: string;
    teamName: string;
    topFour: number;
    total: number;
}

export default async function Standings() {
    const { BASE_URL } = process.env;
    const response = await axios.get(`${BASE_URL}/api/totals`);
    const leagueStats: ResponseData = response.data;
    const rows: TRow[] = [];
    for (const teamKey in leagueStats) {
        const teamData = LEAGUE_DATA[teamKey as TeamKey];
        const teamStats = leagueStats[teamKey as TeamKey] as TotalHomeRuns;
        rows.push({
            teamKey,
            teamName: teamData.teamName,
            topFour: teamStats.topFour,
            total: teamStats.total
        })
    }
    rows.sort((a, b) => {
      if (a.topFour === b.topFour) {
        return (a.total < b.total) ? 1 : -1
      } else {
        return (a.topFour < b.topFour) ? 1 : -1
      }
    })
    return (
        <TableContainer component={Paper}>
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell>Team</TableCell>
                      <TableCell align="right">Top 4 HRs</TableCell>
                      <TableCell align="right">Total HRs</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.teamKey}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      hover={true}
                    >
                      <TableCell component="th" scope="row">
                        <a href={`/team/${row.teamKey}`}>{row.teamName}</a>
                      </TableCell>
                      <TableCell align="right">{row.topFour}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
        </TableContainer>
    )
}