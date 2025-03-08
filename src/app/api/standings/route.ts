import { LEAGUE_DATA } from '../../../constants';
import { getPlayerData, parseQueryString } from '../utils';
import type { TeamKey, TimeSpan } from '../../../constants/types';
import type { GetStandingsResponse } from './types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const timeSpan =
    (parseQueryString(request.url)?.timeSpan as TimeSpan) ?? 'season';

  const homeRuns = await Promise.all(
    Object.keys(LEAGUE_DATA).map(async teamKey => {
      const roster = LEAGUE_DATA[teamKey as TeamKey].roster;
      const homeRuns = await Promise.all(
        roster.map(async player => {
          const data = await getPlayerData(player.id, timeSpan);
          return data?.stats[0]?.splits[0]?.stat?.homeRuns ?? 0;
        }),
      );
      return { key: teamKey, homeRuns };
    }),
  );

  const response = homeRuns.reduce((acc, team) => {
    return {
      ...acc,
      [team.key]: {
        total: sum(team.homeRuns),
        topFour: sum(getTopFour(team.homeRuns)),
      },
    };
  }, {}) as GetStandingsResponse;

  return Response.json(response);
}

const getTopFour = (homeRuns: number[]) => {
    const sortedHomeRuns = homeRuns.sort((a, b) => b - a);
    return sortedHomeRuns.slice(0, 4);
};

const sum = (homeRuns: number[]) =>
    homeRuns.reduce((sum, value) => sum + value, 0);
