import { LEAGUE_DATA } from '../../../../constants';
import { getPlayerData, getTodaysGame, parseQueryString } from '../../utils';
import { formatPlayerInfo } from '../../utils';
import type { TeamKey, TimeSpan } from '../../../../constants/types';
import type { GetTeamResponse } from './types';

export const dynamic = 'force-dynamic';
export async function GET(
  request: Request,
  { params }: { params: { teamKey: TeamKey } },
) {
  const timeSpan =
    (parseQueryString(request.url)?.timeSpan as TimeSpan) ?? 'season';
  const roster = LEAGUE_DATA?.[params.teamKey].roster;
  if (!roster) {
    return new Response('Not found', { status: 404 });
  }

  const teamData: GetTeamResponse = await Promise.all(
    roster.map(async player => {
      const data = await getPlayerData(player.id, timeSpan);
      const info = formatPlayerInfo(data);
      const { homeRuns, gamesPlayed, atBats } =
        data?.stats[0]?.splits[0]?.stat ?? {};
      const todaysGame = await getTodaysGame(player.id, info.teamId);
      console.log('todaysGame', todaysGame);
      return {
        info,
        stats: { homeRuns, gamesPlayed, atBats },
        game: todaysGame ?? null,
      };
    }),
  );
  return Response.json(teamData);
}
