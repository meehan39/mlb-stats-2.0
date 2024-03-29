import { LEAGUE_DATA } from '../../../../constants';
import { getRosterPromises, parseQueryString } from '../../utils';
import type { TeamKey, TimeSpan } from '../../../../constants/types';

export const dynamic = 'force-dynamic';
export async function GET(
    request: Request,
    { params }: { params: { teamKey: TeamKey } },
) {
    const timeSpan =
        (parseQueryString(request.url)?.timeSpan as TimeSpan) ?? 'season';
    const teamData = LEAGUE_DATA?.[params.teamKey];
    if (!teamData) {
        return new Response('Not found', { status: 404 });
    }
    const rosterPromises = getRosterPromises(teamData.roster, timeSpan);
    const playerData = await Promise.all(rosterPromises);
    return Response.json(playerData);
}
