import { LEAGUE_DATA } from '../../../constants';
import { getRosterPromises } from '../utils';
import type { Team, TeamKey } from '../../types';
import type { ResponseData } from './types';
import { PlayerStats } from '../utils/types';

interface TeamHomeRuns {
    key: TeamKey;
    homeRuns: PlayerStats[];
}

const getTopFour = (homeRuns: number[]) => {
    const sortedHomeRuns = homeRuns.sort((a, b) => b - a);
    return sortedHomeRuns.slice(0, 4);
};

const sum = (homeRuns: number[]) => {
    const total = homeRuns.reduce((sum, value) => sum + value, 0);
    return total;
};

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
    const teamPromises = [];
    for (const teamKey in LEAGUE_DATA) {
        const key: TeamKey = teamKey as TeamKey;
        const team: Team = LEAGUE_DATA[key] as any as Team;
        const rosterPromises = getRosterPromises(team.roster);
        teamPromises.push({ key: teamKey, promises: rosterPromises });
    }

    const homeRunArray = (await Promise.all(
        teamPromises.map(
            rosterPromises =>
                new Promise(async resolve => {
                    const homeRuns = await Promise.all(rosterPromises.promises);
                    resolve({ key: rosterPromises.key, homeRuns });
                }),
        ),
    )) as any as TeamHomeRuns[];

    const resData: ResponseData = {};
    for (const team of homeRunArray) {
        const homeRuns = team.homeRuns.map(player => player.homeRuns);
        const key: TeamKey = team.key;
        resData[key] = {
            total: sum(homeRuns),
            topFour: sum(getTopFour(homeRuns)),
        };
    }

    return Response.json(resData);
}
