import type { TeamKey } from '../../../constants/types';

export type GetLeagueLeadersResponse = LeagueLeaderPlayer[];
export interface LeagueLeaderPlayer {
  playerId: number;
  fullName: string;
  owner: TeamKey | null;
  homeRuns: number;
}
