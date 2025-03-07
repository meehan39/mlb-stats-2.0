import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type Player from '../../app/api/player/[playerId]/types';
import type { TimeSpan } from '../../constants/types';

export interface GetPlayerRequest {
  playerId: number;
  timeSpan?: TimeSpan;
}

export const playerApi = createApi({
  reducerPath: 'playerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/player/' }),
  endpoints: builder => ({
    getPlayer: builder.query<Player.Response, GetPlayerRequest>({
      query: ({ playerId, timeSpan }) =>
        `${playerId}?timeSpan=${timeSpan ?? 'season'}`,
    }),
  }),
});

export const { useGetPlayerQuery } = playerApi;