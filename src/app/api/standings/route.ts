import { LEAGUE_DATA } from '../../../constants';
import { getPlayerData, parseQueryString } from '../utils';
import type { TeamKey, TimeSpan } from '../../../constants/types';
import type { GetStandingsResponse, StandingsStatData } from './types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const timeSpan =
    (parseQueryString(request.url)?.timeSpan as TimeSpan) ?? 'season';

  const individualStats = await Promise.all(
    Object.keys(LEAGUE_DATA).map(async teamKey => {
      const roster = LEAGUE_DATA[teamKey as TeamKey].roster;
      const stats = await Promise.all(
        roster.map(async player => {
          const data = await getPlayerData(player.id, timeSpan);
          return {
            homeRuns: data?.stats?.[0]?.splits[0]?.stat?.homeRuns ?? 0,
            games: data?.stats?.[0]?.splits[0]?.stat?.gamesPlayed ?? 0,
            atBats: data?.stats?.[0]?.splits[0]?.stat?.atBats ?? 0,
            hits: data?.stats?.[0]?.splits[0]?.stat?.hits ?? 0,
          };
        }),
      );
      return { key: teamKey, stats };
    }),
  );

  const response: GetStandingsResponse = individualStats
    .map(team => ({
      teamKey: team.key as TeamKey,
      total: sum(team.stats),
      topFour: sum(getTopFour(team.stats)),
    }))
    .sort((a, b) => {
      if (a.topFour.homeRuns > b.topFour.homeRuns) {
        return -1;
      } else if (a.topFour.homeRuns < b.topFour.homeRuns) {
        return 1;
      } else {
        if (a.total.homeRuns > b.total.homeRuns) {
          return -1;
        } else if (a.total.homeRuns < b.total.homeRuns) {
          return 1;
        }
      }
      return 0;
    })
    .map((team, index) => ({
      ranking: index + 1,
      ...team,
    }));

  return Response.json(response);
}

const getTopFour = (stats: StandingsStatData[]) => {
  const sortedHomeRuns = stats.sort((a, b) => b.homeRuns - a.homeRuns);
  return sortedHomeRuns.slice(0, 4);
};

const sum = (stats: StandingsStatData[]) =>
  stats.reduce(
    (sum, stat) => {
      return {
        homeRuns: sum.homeRuns + stat.homeRuns,
        games: sum.games + stat.games,
        atBats: sum.atBats + stat.atBats,
        hits: sum.hits + stat.hits,
      };
    },
    { homeRuns: 0, games: 0, atBats: 0, hits: 0 },
  );
