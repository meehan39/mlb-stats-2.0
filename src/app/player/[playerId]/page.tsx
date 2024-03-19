import Player from '../../../components/player';

export default async function Team({
    params,
}: {
    params: { playerId: number };
}) {
    return <Player playerId={params.playerId} />;
}
