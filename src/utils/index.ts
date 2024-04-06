import axios from './axios';
import TodaysGame from '../app/api/todaysGame/[teamId]/types';
import type { TodayGameData } from './types';

export const getTodaysGamePromises = (
    todaysGames: TodayGameData[],
): Promise<TodaysGame.Data>[] =>
    todaysGames.map(
        game =>
            new Promise<TodaysGame.Data>(async resolve => {
                const { data }: TodaysGame.Response = await axios.get(
                    `/api/todaysGame/${game.teamId}${game.playerId && `?playerId=${game.playerId}`}`,
                );
                resolve(data);
            }),
    );
