import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

import { redirect } from "next/navigation";
import { LEAGUE_DATA } from "../constants";

import type { TeamKey } from "../app/types";
import type { PlayerStats } from "../app/api/utils/types";

export interface PropType {
    teamKey: TeamKey
}

export default async function Stats(props: PropType) {
    const teamKey: TeamKey = props.teamKey;
    const { BASE_URL } = process.env;
    const team = LEAGUE_DATA[teamKey];
    if (!team) {
        redirect("/");
    }
    const response = await axios.get(`${BASE_URL}/api/team/${teamKey}`);
    const data: PlayerStats[] = response.data;
    data.sort((a, b) => (a.homeRuns < b.homeRuns) ? 1 : -1);
    return (
        <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Player</TableCell>
                                <TableCell align="right">Home Runs</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.homeRuns}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
    )
}