import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TimeSpan } from '../../../constants/types';
import type { GetPlayerResponse } from '../../../app/api/player/[playerId]/types';

export interface GetPlayerRequest {
  playerId: number;
  timeSpan?: TimeSpan;
}

export const playerApi = createApi({
  reducerPath: 'playerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/player/' }),
  endpoints: builder => ({
    getPlayer: builder.query<GetPlayerResponse, GetPlayerRequest>({
      query: ({ playerId, timeSpan }) =>
        `${playerId}?timeSpan=${timeSpan ?? 'season'}`,
    }),
  }),
});

export const { useGetPlayerQuery } = playerApi;