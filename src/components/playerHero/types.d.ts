import type { GetPlayerResponse } from '../../app/api/player/[playerId]/types';
import TeamApi from '../../app/api/team/[teamKey]/types';
import type { PlayerGame, PlayerInfo } from '../../app/api/utils/types';
import type { StatItem } from '../statGrid/types';

export interface PlayerHeroProps {
  playerId?: number;
  className?: string;
  playerPageLink?: boolean;
  showOwner?: boolean;
  xl?: boolean;
  statsGridItems?: (player?: GetPlayerResponse) => StatItem[];
  children?: React.ReactNode;
}
