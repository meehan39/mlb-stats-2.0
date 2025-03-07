import type MlbApi from '../app/api/utils/MlbApi';

export const formatPlayerData = (
  playerId: number,
  name: string,
  playerData: MlbApi.PlayerStats.Player | null,
) => ({
  playerId,
  name,
  teamId: playerData?.currentTeam.id ?? -1,
  teamName: playerData?.currentTeam.name ?? 'Free Agent',
  homeRuns: playerData?.stats?.[0]?.splits?.[0]?.stat?.homeRuns ?? 0,
  gamesPlayed: playerData?.stats?.[0]?.splits?.[0]?.stat?.gamesPlayed ?? 0,
  atBats: playerData?.stats?.[0]?.splits?.[0]?.stat?.atBats ?? 0,
  jerseyNumber: parseInt(playerData?.primaryNumber ?? '0'),
});
