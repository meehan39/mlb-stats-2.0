namespace Player {
    interface Props {
        playerId: number;
    }
    namespace Row {
        interface Props {
            key: string;
            category: string;
            value: string | number;
        }
    }
}

export default Player;
