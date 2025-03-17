import { getPlayerData } from '../../../utils';
import type { TimeSpan } from '../../../../../constants/types';
import type { GetMonthOverMonthStatsResponse } from './types';

export const dynamic = 'force-dynamic';
export async function GET(_: Request, props: { params: Promise<{ playerId: string }> }) {
  const { playerId } = await props.params;
  const monthKeys = Array.from(
    { length: new Date().getMonth() - 1 },
    (_, index) => (3 + index).toString() as TimeSpan,
  ).reverse();
  const monthOverMonthStats = await Promise.all(
    monthKeys.map(async month => {
      const response = await getPlayerData(parseInt(playerId), month as TimeSpan);
      return response?.stats?.[0]?.splits?.[0]?.stat?.homeRuns ?? 0;
    }),
  );
  const monthOverMonthStatsMap = monthOverMonthStats.reduce((acc, homeRuns, index) => {
    acc[index] = homeRuns;
    return acc;
  }, Array.from({ length: 7 }, () => 0));
  return Response.json(monthOverMonthStatsMap as GetMonthOverMonthStatsResponse);
}
