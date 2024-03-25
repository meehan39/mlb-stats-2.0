import { LEAGUE_DATA } from '../../../constants';
import { getRosterPromises } from '../utils';
import type { TeamKey } from '../../../constants/types';
import type Standings from './types';
import type { TeamHomeRuns } from './types';
import type { PlayerStats } from '../utils/types';

const getTopFour = (homeRuns: number[]) => {
    const sortedHomeRuns = homeRuns.sort((a, b) => b - a);
    return sortedHomeRuns.slice(0, 4);
};

const sum = (homeRuns: number[]) =>
    homeRuns.reduce((sum, value) => sum + value, 0);

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
    const teamPromises: {
        key: TeamKey;
        promises: Promise<PlayerStats>[];
    }[] = (Object.keys(LEAGUE_DATA) as TeamKey[]).map(teamKey => {
        const rosterPromises = getRosterPromises(LEAGUE_DATA[teamKey].roster);
        return {
            key: teamKey as TeamKey,
            promises: rosterPromises,
        };
    });

    const homeRunArray = await Promise.all(
        teamPromises.map(
            rosterPromises =>
                new Promise(async resolve => {
                    const homeRuns = await Promise.all(rosterPromises.promises);
                    resolve({ key: rosterPromises.key, homeRuns });
                }) as Promise<TeamHomeRuns>,
        ),
    );

    const response = homeRunArray.reduce((acc, team) => {
        const homeRuns = team.homeRuns.map(player => player.homeRuns);
        return {
            ...acc,
            [team.key]: {
                total: sum(homeRuns),
                topFour: sum(getTopFour(homeRuns)),
            },
        };
    }, {}) as Standings.Data;

    return Response.json(response);
}
