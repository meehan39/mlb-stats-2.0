import { LEAGUE_DATA } from '../../../../constants';
import { getPlayerData, getTodaysGame, parseQueryString } from '../../utils';
import { formatPlayerData } from '../../../../utils';
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
  const playerData = await Promise.all(
    teamData.roster.map(async player => {
      const data = await getPlayerData(player.id, timeSpan);
      return formatPlayerData(player.id, player.name, data);
    }),
  );
  const todaysGames = await Promise.all(
    playerData.map(async ({ playerId, teamId }) =>
      getTodaysGame(playerId, teamId),
    ),
  );
  return Response.json(
    playerData.map((player, i) => ({ ...player, game: todaysGames[i] })),
  );
}
