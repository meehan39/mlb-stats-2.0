import type { ResponseType } from 'axios';
import type { TeamKey } from '../../../constants/types';

namespace LeagueLeaders {
    interface Player {
        playerId: number;
        fullName: string;
        owner: TeamKey | null;
        homeRuns: number;
    }
    interface Response extends ResponseType {
        data: Player[];
    }
}

export default LeagueLeaders;
