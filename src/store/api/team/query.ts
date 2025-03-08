import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TimeSpan } from '../../../constants/types';
import type { GetTeamResponse } from '../../../app/api/team/[teamKey]/types';

export interface GetTeamStatsRequest {
  teamId: string;
  timeSpan?: TimeSpan;
}

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/team/' }),
  endpoints: builder => ({
    getTeamStats: builder.query<GetTeamResponse, GetTeamStatsRequest>({
      query: ({ teamId, timeSpan }) =>
        `${teamId}?timeSpan=${timeSpan ?? 'season'}`,
    }),
  }),
});

export const { useGetTeamStatsQuery } = teamApi;