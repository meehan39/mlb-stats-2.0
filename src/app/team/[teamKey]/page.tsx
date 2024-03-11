import Header from "../../../components/header";
import Stats from "../../../components/stats";
import { TeamKey } from "../../types";

export default async function Team({ params }: { params: { teamKey: string } }) {
    const teamKey: TeamKey = params.teamKey as TeamKey;
    try {
        return (
            <main className="flex flex-col items-center justify-start p-4">
                <Header />
                <Stats teamKey={teamKey}/>
            </main>
        );
    } catch (e) {
        console.error(e);
        return <div>ERROR</div>;
    }
}