import { getPlayerData, getOwner } from '../../utils';
import type Player from './types';

export const dynamic = 'force-dynamic';
export async function GET(
    request: Request,
    { params }: { params: { playerId: number } },
) {
    try {
        const player = await getPlayerData(params.playerId);
        if (!player) {
            throw new Error();
        }
        const stats = player.stats[0].splits[0].stat;
        const responseData: Player.Data = {
            fullName: player.fullName,
            owner: getOwner(params.playerId),
            currentTeam: player.currentTeam.name,
            position: player.primaryPosition.name,
            bats: player.batSide.description,
            ...stats,
        };
        return Response.json(responseData);
    } catch (e) {
        console.log(e);
        return Response.json({});
    }
}
