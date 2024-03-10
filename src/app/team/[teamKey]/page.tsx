import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Header from "../../../components/header";
import { redirect } from "next/navigation";
import { LEAGUE_DATA } from "../../../constants";

import type { TeamKey } from "../../types";
import type { PlayerStats } from '../../api/utils/types';

const { BASE_URL } = process.env;

export default async function Team({ params }: { params: { teamKey: string } }) {
    const teamKey: TeamKey = params.teamKey as TeamKey;
    const team = LEAGUE_DATA[teamKey];
    if (!team) {
        redirect("/");
    }
    const response = await axios.get(`${BASE_URL}/api/team/${teamKey}`);
    const data: PlayerStats[] = response.data;
    data.sort((a, b) => (a.homeRuns < b.homeRuns) ? 1 : -1);
    return (
        <main className="flex flex-col items-center justify-start p-4">
            <Header />
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
        </main>
    )
}