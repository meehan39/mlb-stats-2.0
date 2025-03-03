import type { TeamKey } from '../../../../constants/types';
import type { ResponseType } from 'axios';

namespace Player {
    interface Data {
        meta: {
            playerId: number;
            fullName: string;
            owner: TeamKey | null;
            teamName: string;
            teamId: number;
            position: string;
            bats: string;
            primaryNumber: string;
            height: string;
            weight: number;
            currentAge: number;
            mlbDebutDate: string;
        };
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

    type Response = Data;
}

export default Player;
