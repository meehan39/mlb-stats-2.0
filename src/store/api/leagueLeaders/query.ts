import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TimeSpan } from '../../../constants/types';
import type { GetLeagueLeadersResponse } from '../../../app/api/leagueLeaders/types';

export interface GetLeagueLeadersRequest {
  timeSpan?: TimeSpan;
}

export const leagueLeadersApi = createApi({
  reducerPath: 'leagueLeadersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/leagueLeaders' }),
  endpoints: builder => ({
    getLeagueLeaders: builder.query<GetLeagueLeadersResponse, GetLeagueLeadersRequest>({
      query: ({ timeSpan }) => `?timeSpan=${timeSpan ?? 'season'}`,
    }),
  }),
});

export const { useGetLeagueLeadersQuery } = leagueLeadersApi;