import type { TeamKey } from '../../constants/types';

namespace LeagueLeaders {
    namespace Row {
        interface Props {
            key: number;
            playerId: number;
            fullName: string;
            teamKey: TeamKey | null;
            homeRuns: number;
        }
    }
}

export default LeagueLeaders;
