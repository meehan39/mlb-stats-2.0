import { getLeagueLeaders, getOwner } from '../utils';
import type LeagueLeaders from './types';

export async function GET(request: Request) {
    const leagueLeaders = await getLeagueLeaders();
    const response: LeagueLeaders.Player[] =
        leagueLeaders?.map(player => ({
            playerId: player.person.id,
            fullName: player.person.fullName,
            homeRuns: parseInt(player.value),
            owner: getOwner(player.person.id),
        })) ?? [];
    return Response.json(response);
}
