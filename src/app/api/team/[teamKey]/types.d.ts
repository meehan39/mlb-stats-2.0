import type { PlayerMeta, PlayerGame, PlayerStats } from '../../utils/types';

export type GetTeamResponse = GetTeamResponseData[];

export interface GetTeamResponseData {
  meta: PlayerMeta;
  game: PlayerGame | null;
  stats: Pick<PlayerStats, 'homeRuns' | 'gamesPlayed' | 'atBats'>;
}
