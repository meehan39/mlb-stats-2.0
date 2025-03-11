import Player from '../../../components/player';

export const dynamic = 'force-dynamic';
export default async function Team(
    props: {
        params: Promise<{ playerId: number }>;
    }
) {
    const params = await props.params;
    return <Player playerId={params.playerId} />;
}
