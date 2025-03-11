import TeamComponent from '../../../components/team';
import type { TeamKey } from '../../../constants/types';

export const dynamic = 'force-dynamic';
export default async function Team(
    props: {
        params: Promise<{ teamKey: TeamKey }>;
    }
) {
    const params = await props.params;
    return <TeamComponent teamKey={params.teamKey} />;
}
