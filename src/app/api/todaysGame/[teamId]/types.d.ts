import type { ResponseType } from 'axios';

namespace TodaysGame {
    type Data = Game | null;
    type Location = 'home' | 'away';
    type State = 'live' | 'scheduled' | 'final';

    interface Game {
        state: StaticGenerationSearchParamsBailoutProvider;
        opponent: string;
        location: Location;
        startTime: string;
        score: string;
        homeRuns: number;
    }

    interface Response extends ResponseType {
        data: Game;
    }
}

export default TodaysGame;
