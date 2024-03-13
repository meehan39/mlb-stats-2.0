import Stats from '../../../components/stats';
import type { TeamKey } from '../../types';

export default async function Team({
    params,
}: {
    params: { teamKey: TeamKey };
}) {
    return <Stats teamKey={params.teamKey} />;
}
