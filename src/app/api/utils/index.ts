import axios from 'axios';
import queryString from 'querystring';
import { LEAGUE_DATA, PATHS } from '../../../constants';
import type { TeamKey, TimeSpan } from '../../../constants/types';
import type { PlayerGame, PlayerInfo } from './types';
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

export const getTodaysGame = async (
  playerId: number,
  teamId: number | undefined,
): Promise<PlayerGame | null> => {
  if (!teamId) {
    return null;
  }
  const { data }: MlbApi.Schedule.Response = await axios.get(
    `${PATHS.SCHEDULE(teamId)}`,
  );
  const todaysGame = data?.dates?.[0]?.games?.[0];
  const state =
    { F: 'final', I: 'live' }[todaysGame?.status?.codedGameState] ??
    'scheduled';

  return todaysGame
    ? ({
        state,
        location: todaysGame.teams.home.team.locationName,
        startTime: todaysGame.gameDate,
        home: {
          id: todaysGame.teams.home.team.id,
          name: todaysGame.teams.home.team.name,
          score: todaysGame.teams.home.score,
          record: todaysGame.teams.home.leagueRecord,
        },
        away: {
          id: todaysGame.teams.away.team.id,
          name: todaysGame.teams.away.team.name,
          score: todaysGame.teams.away.score,
          record: todaysGame.teams.away.leagueRecord,
        },
        stats:
          todaysGame && playerId
            ? await fetchGameStats(playerId, todaysGame.gamePk)
            : {},
      } as PlayerGame)
    : null;
};

const fetchGameStats = async (playerId: number, gameId: number) => {
  try {
    const { data }: MlbApi.GameStats.Response = await axios.get(
      `${PATHS.GAME_STATS(playerId, gameId)}`,
    );
    const { homeRuns, hits, baseOnBalls, atBats, strikeOuts, rbi, runs } =
      data.stats[0]?.splits?.[0]?.stat ?? {};
    return { homeRuns, hits, baseOnBalls, atBats, strikeOuts, rbi, runs };
  } catch {
    return {};
  }
};

export const formatPlayerInfo = (
  playerData: MlbApi.PlayerStats.Player | null | undefined,
): PlayerInfo => ({
  playerId: playerData?.id ?? -1,
  owner: getOwner(playerData?.currentTeam.id ?? -1),
  fullName: playerData?.fullName ?? 'Unknown',
  teamId: playerData?.currentTeam.id ?? -1,
  teamName: playerData?.currentTeam.name ?? 'Free Agent',
  jerseyNumber: parseInt(playerData?.primaryNumber ?? '0'),
});

export const parseQueryString = (url: string) =>
  queryString.parse(url.split('?')?.[1]) ?? {};
