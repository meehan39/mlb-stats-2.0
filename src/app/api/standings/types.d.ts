import type { TeamKey } from '../../../constants/types';
import type { LeagueData } from '../../../constants/types';
import type { ResponseType } from 'axios';

namespace Standings {
    type Data = {
        [key in TeamKey]: TotalHomeRuns;
    };

    interface TotalHomeRuns {
        topFour: number;
        total: number;
    }

    interface Response extends ResponseType {
        data: Data;
    }
}

export interface TeamHomeRuns {
    key: TeamKey;
    homeRuns: PlayerStats[];
}

export default Standings;
