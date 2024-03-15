import type { ResponseType } from 'axios';
import type { PlayerStats } from '../../utils/types';

namespace Team {
    interface Response extends ResponseType {
        data: PlayerStats[];
    }
}

export default Team;
