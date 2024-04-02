import type { ResponseType } from 'axios';

namespace NextGame {
    type Data = Game | null;
    type Location = 'home' | 'away';
    type State = 'live' | 'scheduled' | 'final';

    interface Game {
        state: StaticGenerationSearchParamsBailoutProvider;
        opponent: string;
        location: Location;
        startTime: string;
        score: string;
    }

    interface Response extends ResponseType {
        data: Game;
    }
}

export default NextGame;
