import {
  getPlayerData,
  getTodaysGame,
  parseQueryString,
} from '../../../utils';

export const dynamic = 'force-dynamic';
export async function GET(request: Request, props: { params: Promise<{ playerId: string }> }) {
  const params = await props.params;
  try {
    let teamCode: number;
    const mlbTeamId = (parseQueryString(request.url)?.mlbTeamId) as string | undefined;
    if (!mlbTeamId) {
      const player = await getPlayerData(parseInt(params.playerId), 'season');
      if (!player?.currentTeam?.id) {
        throw new Error('Player not found');
      }
      teamCode = player.currentTeam.id;
    } else {
      teamCode = parseInt(mlbTeamId);
    }
    const game = await getTodaysGame(parseInt(params.playerId), teamCode);
    return Response.json(game);
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }
}
