import type { TeamKey } from '../../../constants/types';

export interface GetStandingsResponse {
  [key in TeamKey]: TeamHomeRuns;
}

export interface TeamHomeRuns {
  topFour: number;
  total: number;
}
