import type NextGame from '../../app/api/nextGame/[teamId]/types';

namespace Team {
    interface Props {
        teamKey: TeamKey;
    }

    namespace PlayerCard {
        interface Props {
            name: string;
            nextGame?: NextGame.Data;
        }
    }
}

export default Team;
