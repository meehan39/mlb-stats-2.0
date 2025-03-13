import type { TeamKey } from '../../../../constants/types';
import type MlbApi from '../../utils/MlbApi';
import type { PlayerInfo, PlayerStats } from '../../utils/types';

export interface GetPlayerResponse {
  info: PlayerInfo;
  stats: PlayerStats;
  metaData: PlayerMetaData;
}

export interface PlayerMetaData
  extends Pick<
    Partial<MlbApi.PlayerStats.Player>,
    'currentAge' | 'height' | 'weight' | 'mlbDebutDate'
  > {
  bats?: string;
  primaryPosition?: string;
}
