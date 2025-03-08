import type { TeamKey } from '../../../../constants/types';
import type { PlayerMeta, PlayerStats } from '../../utils/types';

export interface GetPlayerResponse {
  meta: PlayerMeta;
  todaysGame: PlayerGame | null;
  stats: PlayerStats;
}
