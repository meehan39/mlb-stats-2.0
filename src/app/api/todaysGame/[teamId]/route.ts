import axios from 'axios';

import { PATHS } from '../../../../constants';
import { parseQueryString } from '../../utils';

import type MlbApi from '../../utils/MlbApi';
import type TodaysGame from './types';

export const dynamic = 'force-dynamic';
export async function GET(
    request: Request,
    { params }: { params: { teamId: string } },
) {
    try {
        const playerId = parseQueryString(request.url)?.playerId as string;
        const { data }: MlbApi.Schedule.Response = await axios.get(
            `${PATHS.SCHEDULE(parseInt(params.teamId))}`,
        );
        const todaysGame = data?.dates?.[0]?.games?.[0];

        const [queried, opposing]: [
            MlbApi.Schedule.TeamType,
            MlbApi.Schedule.TeamType,
        ] =
            parseInt(params.teamId) === todaysGame.teams.home.team.id
                ? ['home', 'away']
                : ['away', 'home'];

        const responseData = todaysGame
            ? ({
                  state:
                      { F: 'final', I: 'live' }[
                          todaysGame.status.codedGameState
                      ] ?? 'scheduled',
                  opponent: todaysGame.teams[opposing].team.abbreviation ?? '',
                  location: queried,
                  startTime: todaysGame.gameDate,
                  score: `${todaysGame.teams[queried].score}-${todaysGame.teams[opposing].score}`,
                  homeRuns:
                      todaysGame && playerId
                          ? await fetchGameStats(
                                parseInt(playerId),
                                todaysGame.gamePk,
                            )
                          : 0,
              } as TodaysGame.Game)
            : null;
        return Response.json(responseData);
    } catch (e) {
        console.log(e);
        return Response.json(null);
    }
}

const fetchGameStats = async (playerId: number, gameId: number) => {
    try {
        const { data }: MlbApi.GameStats.Response = await axios.get(
            `${PATHS.GAME_STATS(playerId, gameId)}`,
        );
        return data.stats[0]?.splits?.[0].stat?.homeRuns ?? 0;
    } catch {
        return 0;
    }
};
