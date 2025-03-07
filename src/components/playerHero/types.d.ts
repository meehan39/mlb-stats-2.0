namespace PlayerHero {
  export interface Props {
    player?: TeamApi.PlayerData;
    className?: string;
    children: React.ReactNode;
  }
}

export default PlayerHero;