import { getPlayerData, getOwner } from '../../utils';
import type Player from './types';

export const dynamic = 'force-dynamic';
export async function GET(
    request: Request,
    { params }: { params: { playerId: string } },
) {
    try {
        const playerId = parseInt(params.playerId);
        const player = await getPlayerData(playerId);
        if (!player) {
            throw new Error();
        }
        const responseData: Player.Data = {
            fullName: player.fullName,
            owner: getOwner(playerId),
            currentTeam: player.currentTeam.name,
            position: player.primaryPosition.name,
            bats: player.batSide.description,
            ...player?.stats?.[0]?.splits?.[0]?.stat,
        };
        return Response.json(responseData);
    } catch (e) {
        return new Response('Not found', { status: 404 });
    }
}
