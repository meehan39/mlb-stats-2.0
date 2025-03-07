import type { ResponseType } from 'axios';
import type { PlayerStats } from '../../utils/types';

namespace Team {
  interface Response extends ResponseType {
    data: PlayerData[];
  }

  type Location = 'home' | 'away';
  type GameState = 'live' | 'scheduled' | 'final';

  interface PlayerData extends PlayerStats {
    game: Game;
  }

  interface Game {
    state: GameState;
    startTime: string;
    home: TeamData;
    away: TeamData;
    homeRuns: number;
  }

  interface TeamData {
    id: number;
    name: string;
    score: number;
    record: {
      wins: number;
      losses: number;
    };
  }
}

export default Team;
