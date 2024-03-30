import type { TeamKey } from '../../constants/types';

namespace Standings {
    export interface Row {
        teamKey: TeamKey;
        teamName: string;
        topFour: number;
        total: number;
    }
}

export default Standings;
