import type { TeamKey } from '../../../../constants/types';
import type { ResponseType } from 'axios';

namespace Player {
    interface Data {
        fullName: string;
        owner: TeamKey | null;
        currentTeam: string;
        position: string;
        bats: string;
        gamesPlayed?: number;
        atBats?: number;
        plateAppearances?: number;
        hits?: number;
        runs?: number;
        rbi?: number;
        avg?: string;
        baseOnBalls?: number;
        doubles?: number;
        triples?: number;
        homeRuns?: number;
        strikeOuts?: number;
        obp?: string;
        slg?: string;
        ops?: string;
    }

    interface Response extends ResponseType {
        data: Data;
    }
}

export default Player;
