import { getPlayerData, parseQueryString, getOwner } from '../../utils';
import { formatPlayerInfo } from '../../utils';
import type { TimeSpan } from '../../../../constants/types';
import type { GetPlayerResponse } from './types';

export const dynamic = 'force-dynamic';
export async function GET(request: Request, props: { params: Promise<{ playerId: string }> }) {
  const params = await props.params;
  try {
    const timeSpan =
      (parseQueryString(request.url)?.timeSpan as TimeSpan) ?? 'season';
    const playerId = parseInt(params.playerId);
    const player = await getPlayerData(playerId, timeSpan);
    const {
      batSide,
      currentAge,
      height,
      weight,
      mlbDebutDate,
      primaryPosition,
    } = player ?? {};
    const responseData: GetPlayerResponse = {
      info: { ...formatPlayerInfo(player), owner: getOwner(playerId) },
      stats: player?.stats?.[0]?.splits?.[0]?.stat ?? {},
      metaData: {
        bats: batSide?.code,
        currentAge,
        height,
        weight,
        mlbDebutDate,
        primaryPosition: primaryPosition?.abbreviation,
      },
    };
    return Response.json(responseData);
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }
}
