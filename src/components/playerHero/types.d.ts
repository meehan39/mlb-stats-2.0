import TeamApi from '../../app/api/team/[teamKey]/types';

namespace PlayerHero {
  export interface Props {
    player?: TeamApi.PlayerData;
    className?: string;
    children: React.ReactNode;
  }
}

export default PlayerHero;
