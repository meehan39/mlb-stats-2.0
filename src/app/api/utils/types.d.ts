import type MlbApi from './MlbApi';

type GameState = 'live' | 'scheduled' | 'final';

export interface PlayerMeta {
  playerId: number;
  owner: string | null;
  fullName: string;
  teamId: number;
  teamName: string;
  jerseyNumber: number;
}

export type PlayerStats = Partial<MlbApi.PlayerStats.StatsSplit['stat']>;

export interface PlayerGame {
  state: GameState;
  startTime: string;
  home: TeamData;
  away: TeamData;
  homeRuns: number;
}

export interface TeamData {
  id: number;
  name: string;
  score: number;
  record: {
    wins: number;
    losses: number;
  };
}
