import axios from 'axios';

import { MLB_BASE_API, PATHS } from '../../../../constants';

import type MlbApi from '../../utils/MlbApi';
import type NextGame from './types';

export const dynamic = 'force-dynamic';
export async function GET(
    request: Request,
    { params }: { params: { teamId: string } },
) {
    try {
        const { data }: MlbApi.Schedule.Response = await axios.get(
            `${MLB_BASE_API}${PATHS.SCHEDULE(parseInt(params.teamId))}`,
        );
        const nextGame = data?.dates?.[0]?.games?.[0];

        const [queried, opposing]: [
            MlbApi.Schedule.TeamType,
            MlbApi.Schedule.TeamType,
        ] =
            parseInt(params.teamId) === nextGame.teams.home.team.id
                ? ['home', 'away']
                : ['away', 'home'];

        const responseData = nextGame
            ? ({
                  state:
                      { F: 'final', I: 'live' }[
                          nextGame.status.codedGameState
                      ] ?? 'scheduled',
                  opponent: nextGame.teams[opposing].team.abbreviation ?? '',
                  location: queried,
                  startTime: nextGame.gameDate,
                  score: `${nextGame.teams[queried].score}-${nextGame.teams[opposing].score}`,
              } as NextGame.Game)
            : null;
        return Response.json(responseData);
    } catch (e) {
        return new Response('Not found', { status: 404 });
    }
}
