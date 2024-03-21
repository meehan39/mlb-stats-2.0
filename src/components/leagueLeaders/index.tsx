import axios from '../../utils/axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import LeagueLeaderRow from './leagueLeaderRow';
import Subheader from '../subheader';

import type LeagueLeaders from './types';
import type LeagueLeadersApi from '../../app/api/leagueLeaders/types';

export default async function LeagueLeaders() {
    try {
        const { data }: LeagueLeadersApi.Response =
            await axios.get('/api/leagueLeaders');
        return <div>{JSON.stringify(data)}</div>;
    } catch (e) {
        return <div>{JSON.stringify(e)}</div>;
    }

}
