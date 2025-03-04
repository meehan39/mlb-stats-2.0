import PlayerApi from '../../app/api/player/[playerId]/types';

namespace Player {
  interface Props {
    playerId: number;
  }
  namespace Hero {
    interface Props extends Partial<PlayerApi.Data['meta']> {
      loading: boolean;
    }
  }
  namespace Stats {
    type Props = Required<omit<PlayerApi.Data, 'meta'>> & { loading: boolean };
  }
  namespace Card {
    interface Props {
      label: string;
      loading?: boolean;
      hidable?: boolean;
      isText?: boolean;
      isXL?: boolean;
      fillWidth?: boolean;
      direction?: 'row' | 'column';
      className?: string;
      children?: React.ReactNode;
    }
  }
}

export default Player;
