import { getLeagueLeaders, getOwner, parseQueryString } from '../utils';
import type { TimeSpan } from '../../../constants/types';
import type { GetLeagueLeadersResponse } from './types';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const timeSpan =
  (parseQueryString(request.url)?.timeSpan as TimeSpan) ?? 'season';
  const offset = parseQueryString(request.url)?.offset as string;

  const leagueLeaders = await getLeagueLeaders(
    timeSpan,
    parseInt(offset ?? '0'),
  );
  const response: GetLeagueLeadersResponse =
    leagueLeaders?.map(player => ({
      playerId: player.person.id,
      fullName: player.person.fullName,
      homeRuns: parseInt(player.value),
      owner: getOwner(player.person.id),
    })) ?? [];
  return Response.json(response);
}
