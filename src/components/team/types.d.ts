import type TodaysGame from '../../app/api/todaysGame/types';
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
      key: number;
    }
  }
}

export default Team;
