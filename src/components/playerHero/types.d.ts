import TeamApi from '../../app/api/team/[teamKey]/types';
import type { PlayerGame, PlayerInfo } from '../../app/api/utils/types';

export interface PlayerHeroProps {
  player?: PlayerInfo | null;
  todaysGame?: PlayerGame | null;
  className?: string;
  onClick?: () => void;
  showOwner?: boolean;
  xl?: boolean;
  children?: React.ReactNode;
}
