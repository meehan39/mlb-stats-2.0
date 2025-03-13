import type { TeamKey } from '../../../constants/types';

export type GetStandingsResponse = TeamStandingsStats[];

export interface TeamStandingsStats {
  ranking: number;
  teamKey: TeamKey;
  total: StandingsStatData;
  topFour: StandingsStatData;
}

export interface StandingsStatData {
  homeRuns: number;
  games: number;
  atBats: number;
  hits: number;
}
