import { getPlayerData, getOwner, parseQueryString } from '../../utils';
import type Player from './types';
import type { TimeSpan } from '../../../../constants/types';

export const dynamic = 'force-dynamic';
export async function GET(
    request: Request,
    { params }: { params: { playerId: string } },
) {
    try {
        const timeSpan =
            (parseQueryString(request.url)?.timeSpan as TimeSpan) ?? 'season';
        const playerId = parseInt(params.playerId);
        const player = await getPlayerData(playerId, timeSpan);
        if (!player) {
            throw new Error();
        }
        const {
            fullName,
            currentTeam,
            primaryNumber,
            primaryPosition,
            height,
            weight,
            batSide,
            currentAge,
            mlbDebutDate,
        } = player;
        const responseData: Player.Data = {
            meta: {
                playerId,
                fullName,
                primaryNumber,
                height,
                weight,
                currentAge,
                mlbDebutDate,
                owner: getOwner(playerId),
                teamId: currentTeam.id,
                teamName: currentTeam.name,
                position: primaryPosition.abbreviation,
                bats: batSide.description,
            },
            ...player?.stats?.[0]?.splits?.[0]?.stat,
        };
        return Response.json(responseData);
    } catch (e) {
        return new Response('Not found', { status: 404 });
    }
}
