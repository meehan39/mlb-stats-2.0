import type { ResponseType } from 'axios';

namespace NextGame {
    type Data = Game | null;
    type Location = 'home' | 'away';

    interface Game {
        state: 'live' | 'scheduled';
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
