import { TableRow, TableCell } from '@mui/material';

import type Player from './types';
export default function PlayerRow({ category, value }: Player.Row.Props) {
    return (
        <TableRow
            sx={{
                '&:last-child td, &:last-child th': {
                    border: 0,
                },
            }}>
            <TableCell component='th' scope='row'>
                {category}
            </TableCell>
            <TableCell align='right'>{value}</TableCell>
        </TableRow>
    );
}
