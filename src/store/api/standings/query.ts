import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TimeSpan } from '../../../constants/types';
import type { GetStandingsResponse } from '../../../app/api/standings/types';

export interface GetStandingsRequest {
  timeSpan?: TimeSpan;
}

export const standingsApi = createApi({
  reducerPath: 'standingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/standings' }),
  endpoints: builder => ({
    getStandings: builder.query<GetStandingsResponse, GetStandingsRequest>({
      query: ({ timeSpan }) => `?timeSpan=${timeSpan ?? 'season'}`,
    }),
  }),
});

export const { useGetStandingsQuery } = standingsApi;