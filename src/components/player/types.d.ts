import PlayerApi from '../../app/api/player/[playerId]/types';

namespace Player {
    interface Props {
        playerId: number;
    }
    namespace Hero {
        interface Props extends Partial<PlayerApi.Data['meta']> {
            loading: boolean;
        }
        namespace Card {
            interface Props {
                label: string;
                hidable?: boolean;
                text?: boolean;
                fillWidth?: boolean;
                children?: React.ReactNode;
            }
        }
    }
}

export default Player;
