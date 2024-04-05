import axios from 'axios';
import queryString from 'querystring';
import { LEAGUE_DATA, PATHS } from '../../../constants';
import type { Player, TeamKey, TimeSpan } from '../../../constants/types';
import type { PlayerStats } from './types';
import type MlbApi from './MlbApi';

export const getPlayerData = async (
    playerId: number,
    timeSpan: TimeSpan,
): Promise<MlbApi.PlayerStats.Player | null> => {
    try {
        const response: MlbApi.PlayerStats.Response = await axios.get(
            PATHS.STATS(playerId, timeSpan),
        );
        return response.data.people[0];
    } catch {
        return null;
    }
};

export const getLeagueLeaders = async (
    timeSpan: TimeSpan,
): Promise<MlbApi.LeagueLeaders.Leader[] | null> => {
    try {
        const response: MlbApi.LeagueLeaders.Response = await axios.get(
            PATHS.LEAGUE_LEADERS(timeSpan),
        );
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
                    teamId: playerData?.currentTeam.id ?? -1,
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
