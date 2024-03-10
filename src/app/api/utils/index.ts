import axios from "axios";
import { SEASON } from "../../../constants";
import type { Player } from "../../types";
import type { PlayerStats } from "./types";

export const getRosterPromises = (roster: Player[]): Promise<PlayerStats>[] => {
    const promises = [];
    for (const player of roster) {
        const promise: Promise<PlayerStats> = new Promise(async (resolve) => {
            try {
                const url = `https://statsapi.mlb.com/api/v1/people/${player.id}?hydrate=stats(group=%5Bhitting%5D,type=season,season=${SEASON},sportId=1),currentTeam`;
                const { data } = await axios.get(url);
                const homeRuns = data.people[0].stats[0].splits[0].stat.homeRuns;
                resolve({name: player.name, homeRuns} as PlayerStats);
            } catch {
                resolve({name: player.name, homeRuns: 0} as PlayerStats);
            }
        });
        promises.push(promise);
    }
    return promises;
}