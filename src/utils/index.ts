import axios from './axios';
import NextGame from '../app/api/nextGame/[teamId]/types';

export const getNextGamePromises = (
    teamIds: number[],
): Promise<NextGame.Data>[] =>
    teamIds.map(
        teamId =>
            new Promise<NextGame.Data>(async resolve => {
                const { data }: NextGame.Response = await axios.get(
                    `/api/nextGame/${teamId}`,
                );
                resolve(data);
            }),
    );
