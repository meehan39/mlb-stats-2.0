import type TodaysGame from '../../app/api/todaysGame/[teamId]/types';
import type Table from '../table/types';

namespace Team {
    interface Props {
        teamKey: TeamKey;
    }

    interface Row extends Table.Row {
        todaysGame?: TodaysGame.Data;
    }

    namespace PlayerCard {
        interface Props {
            name: string;
            todaysGame?: TodaysGame.Data;
        }
    }
}

export default Team;
