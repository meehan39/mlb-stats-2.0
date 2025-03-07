import axios from 'axios';
import queryString from 'querystring';
import { LEAGUE_DATA, PATHS } from '../../../constants';
import type { Player, TeamKey, TimeSpan } from '../../../constants/types';
import type { PlayerStats } from './types';
import type MlbApi from './MlbApi';
import type Team from '../team/[teamKey]/types';
import { formatPlayerData } from '../../../utils';

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
        const data = await getPlayerData(player.id, timeSpan);
        resolve(formatPlayerData(player.id, player.name, data));
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

export const getTodaysGame = async (
  playerId: number,
  teamId: number,
): Promise<Team.Game | null> => {
  const { data }: MlbApi.Schedule.Response = await axios.get(
    `${PATHS.SCHEDULE(teamId)}`,
  );
  const todaysGame = data?.dates?.[0]?.games?.[0];

  const [queried, opposing]: [
    MlbApi.Schedule.TeamType,
    MlbApi.Schedule.TeamType,
  ] =
    teamId === todaysGame?.teams?.home?.team?.id
      ? ['home', 'away']
      : ['away', 'home'];

  return todaysGame
    ? ({
        state:
          { F: 'final', I: 'live' }[todaysGame.status.codedGameState] ??
          'scheduled',
        location: queried,
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
        homeRuns:
          todaysGame && playerId
            ? await fetchGameStats(playerId, todaysGame.gamePk)
            : 0,
      } as Team.Game)
    : null;
};

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

export const parseQueryString = (url: string) => queryString.parse(url.split('?')?.[1]) ?? {};;
