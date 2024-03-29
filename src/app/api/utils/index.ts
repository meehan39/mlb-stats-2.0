import axios from 'axios';
import { LEAGUE_DATA, MLB_BASE_API, PATHS } from '../../../constants';
import queryString from 'querystring';
import type { Player, TeamKey, TimeSpan } from '../../../constants/types';
import type { PlayerStats } from './types';
import type MlbApi from './MlbApi';

export const getPlayerData = async (
    playerId: number,
    timeSpan: TimeSpan,
): Promise<MlbApi.PlayerStats.Player | null> => {
    const url =
        timeSpan === 'season'
            ? `${MLB_BASE_API}${PATHS.PLAYER_STATS(playerId)}`
            : `${MLB_BASE_API}${PATHS.MONTHLY_PLAYER_STATS(playerId, timeSpan)}`;
    try {
        const response: MlbApi.PlayerStats.Response = await axios.get(url);
        return response.data.people[0];
    } catch {
        return null;
    }
};

export const getLeagueLeaders = async (): Promise<
    MlbApi.LeagueLeaders.Leader[] | null
> => {
    const url = `${MLB_BASE_API}${PATHS.LEAGUE_LEADERS}`;
    try {
        const response: MlbApi.LeagueLeaders.Response = await axios.get(url);
        return response.data.leagueLeaders[0].leaders;
    } catch {
        return null;
    }
};

export const getRosterPromises = (
    roster: Player[],
    timeSpan: TimeSpan,
): Promise<PlayerStats>[] =>
    roster.map(
        player =>
            new Promise<PlayerStats>(async resolve => {
                const playerData = await getPlayerData(player.id, timeSpan);
                const stats: PlayerStats = {
                    playerId: player.id,
                    name: player.name,
                    homeRuns:
                        playerData?.stats?.[0]?.splits?.[0]?.stat?.homeRuns ??
                        0,
                };
                resolve(stats);
            }),
    );

export const getOwner = (playerId: number): TeamKey | null => {
    for (const teamKey in LEAGUE_DATA) {
        for (const player of LEAGUE_DATA[teamKey as TeamKey].roster) {
            if (player.id === playerId) {
                return teamKey as TeamKey;
            }
        }
    }
    return null;
};

export const parseQueryString = (url: string) => queryString.parse(url.split('?')?.[1]) ?? {};;
