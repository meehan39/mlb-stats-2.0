import { getPlayerData, parseQueryString, getTodaysGame } from '../../utils';
import { formatPlayerMeta } from '../../utils';
import type { TimeSpan } from '../../../../constants/types';
import type { GetPlayerResponse } from './types';

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
    const game = await getTodaysGame(playerId, player?.currentTeam?.id);
    const responseData: GetPlayerResponse = {
      meta: { ...formatPlayerMeta(player), game },
      stats: player?.stats?.[0]?.splits?.[0]?.stat ?? {},
      todaysGame: game,
    };
    return Response.json(responseData);
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }
}
