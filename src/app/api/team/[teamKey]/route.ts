import { LEAGUE_DATA } from '../../../../constants';
import { TeamKey } from '../../../types';
import { getRosterPromises } from '../../utils';

export const dynamic = 'force-dynamic';
export async function GET(
    request: Request,
    { params }: { params: { teamKey: string } },
) {
    const teamKey: TeamKey = params.teamKey as TeamKey;
    const teamData = LEAGUE_DATA?.[teamKey];
    if (!teamData) {
        return new Response('Not found', { status: 404 });
    }
    const rosterPromises = getRosterPromises(teamData.roster);
    const playerData = await Promise.all(rosterPromises);
    return Response.json(playerData);
}
