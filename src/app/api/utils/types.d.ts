import type MlbApi from './MlbApi';

type GameState = 'live' | 'scheduled' | 'final';

export interface PlayerInfo {
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
  location: string;
  startTime: string;
  home: TeamData;
  away: TeamData;
  stats: PlayerGameStats;
}

export type PlayerGameStats = Pick<
  MlbApi.GameStats.Stat,
  'homeRuns' | 'baseOnBalls' | 'hits' | 'atBats' | 'strikeOuts' | 'rbi' | 'runs'
>;

export interface TeamData {
  id: number;
  name: string;
  score: number;
  record: {
    wins: number;
    losses: number;
  };
}
