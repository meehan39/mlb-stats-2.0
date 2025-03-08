import { configureStore } from '@reduxjs/toolkit';
import timeSpanReducer from './timeSpan/slice';
import subheaderReducer from './subheader/slice';
import { teamApi } from './api/team/query';
import { leagueLeadersApi } from './api/leagueLeaders/query';
import { standingsApi } from './api/standings/query';
import { playerApi } from './api/player/query';

export const makeStore = () => {
  return configureStore({
    reducer: {
      timeSpan: timeSpanReducer,
      subheader: subheaderReducer,
      [teamApi.reducerPath]: teamApi.reducer,
      [playerApi.reducerPath]: playerApi.reducer,
      [leagueLeadersApi.reducerPath]: leagueLeadersApi.reducer,
      [standingsApi.reducerPath]: standingsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(teamApi.middleware, playerApi.middleware, leagueLeadersApi.middleware, standingsApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
