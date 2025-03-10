import type { PlayerInfo, PlayerGame, PlayerStats } from '../../utils/types';

export type GetTeamResponse = GetTeamResponseData[];

export interface GetTeamResponseData {
  info: PlayerInfo;
  game: PlayerGame | null;
  stats: Pick<PlayerStats, 'homeRuns' | 'gamesPlayed' | 'atBats'>;
}
