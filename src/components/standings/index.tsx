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

import StandingsRow from "./standingsRow";

import { LEAGUE_DATA } from "../../constants";

import type { TeamKey } from "../../app/types";
import type { ResponseData, TotalHomeRuns } from "../../app/api/totals/types";

export interface TRow {
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
                  {rows.map((row) => {
                    const { teamKey, teamName, topFour, total } = row;
                    return <StandingsRow key={teamKey} teamKey={teamKey} teamName={teamName} topFour={topFour} total={total}/>
})}
              </TableBody>
            </Table>
        </TableContainer>
    )
}