import type NextGame from '../../app/api/nextGame/[teamId]/types';
import type Table from '../table/types';

namespace Team {
    interface Props {
        teamKey: TeamKey;
    }

    interface Row extends Table.Row {
        nextGame?: NextGame.Data;
    }

    namespace PlayerCard {
        interface Props {
            name: string;
            nextGame?: NextGame.Data;
        }
    }
}

export default Team;
