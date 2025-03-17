import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TimeSpan } from '../../../constants/types';
import type { GetPlayerResponse } from '../../../app/api/player/[playerId]/types';
import type { PlayerGame } from '../../../app/api/utils/types';
import type { GetMonthOverMonthStatsResponse } from '../../../app/api/player/[playerId]/monthOverMonthStats/types';

export interface GetPlayerRequest {
  playerId: number;
  timeSpan?: TimeSpan;
}

export interface GetTodaysGameRequest {
  playerId: number;
  mlbTeamId?: number;
}

export interface GetMonthOverMonthStatsRequest {
  playerId: number;
  mlbTeamId?: number;
}

export const playerApi = createApi({
  reducerPath: 'playerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/player/' }),
  endpoints: builder => ({
    getPlayer: builder.query<GetPlayerResponse, GetPlayerRequest>({
      query: ({ playerId, timeSpan }) =>
        `${playerId}?timeSpan=${timeSpan ?? 'season'}`,
    }),
    getTodaysGame: builder.query<PlayerGame, GetTodaysGameRequest>({
      query: ({ playerId, mlbTeamId }) =>
        `${playerId}/todaysGame${mlbTeamId ? `?mlbTeamId=${mlbTeamId}` : ''}`,
    }),
    getMonthOverMonthStats: builder.query<
      GetMonthOverMonthStatsResponse,
      GetMonthOverMonthStatsRequest
    >({
      query: ({ playerId }) => `${playerId}/monthOverMonthStats`,
    }),
  }),
});

export const {
  useGetPlayerQuery,
  useLazyGetPlayerQuery,
  useGetTodaysGameQuery,
  useLazyGetTodaysGameQuery,
  useGetMonthOverMonthStatsQuery,
  useLazyGetMonthOverMonthStatsQuery,
} = playerApi;