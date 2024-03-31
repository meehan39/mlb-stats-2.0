import { getLeagueLeaders, getOwner, parseQueryString } from '../utils';
import type LeagueLeaders from './types';
import type { TimeSpan } from '../../../constants/types';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
    const timeSpan =
        (parseQueryString(request.url)?.timeSpan as TimeSpan) ?? 'season';

    const leagueLeaders = await getLeagueLeaders(timeSpan);
    const response: LeagueLeaders.Player[] =
        leagueLeaders?.map(player => ({
            playerId: player.person.id,
            fullName: player.person.fullName,
            homeRuns: parseInt(player.value),
            owner: getOwner(player.person.id),
        })) ?? [];
    return Response.json(response);
}
