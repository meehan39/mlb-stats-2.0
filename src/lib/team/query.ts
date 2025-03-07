import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type Team from '../../app/api/team/[teamKey]/types';
import type { TimeSpan } from '../../constants/types';

export interface GetTeamStatsRequest {
  teamId: string;
  timeSpan?: TimeSpan;
}

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getTeamStats: builder.query<Team.Response["data"], GetTeamStatsRequest>({
      query: ({teamId, timeSpan}) => `team/${teamId}?timeSpan=${timeSpan ?? 'season'}`,
    }),
  }),
})

export const { useGetTeamStatsQuery } = teamApi;