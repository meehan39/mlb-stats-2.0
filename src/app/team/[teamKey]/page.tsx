import TeamComponent from '../../../components/team';
import type { TeamKey } from '../../../constants/types';

export default async function Team({
    params,
}: {
    params: { teamKey: TeamKey };
}) {
    return <TeamComponent teamKey={params.teamKey} />;
}
