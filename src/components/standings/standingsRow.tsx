'use client';
import {
    TableRow,
    TableCell
} from "@mui/material";
import { useRouter } from "next/navigation";

import type { TRow } from ".";

export default function StandingsRow(props: TRow) {
    const router = useRouter();
    return (
        <TableRow
            key={props.teamKey}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            hover={true}
            onClick={() => router.push(`/team/${props.teamKey}`)}
        >
            <TableCell component="th" scope="row">
                <span>{props.teamName}</span>
            </TableCell>
            <TableCell align="right">{props.topFour}</TableCell>
            <TableCell align="right">{props.total}</TableCell>
        </TableRow>
    )
}