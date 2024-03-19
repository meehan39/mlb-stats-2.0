namespace Stats {
    interface Props {
        teamKey: TeamKey;
    }

    namespace Row {
        interface Props {
            playerId: number;
            name: string;
            homeRuns: number;
        }
    }
}

export default Stats;
