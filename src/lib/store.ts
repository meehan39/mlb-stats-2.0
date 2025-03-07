import { configureStore } from '@reduxjs/toolkit';
import timeSpanReducer from './timeSpan/slice';
import subheaderReducer from './subheader/slice';
import { teamApi } from './team/query';

export const makeStore = () => {
  return configureStore({
    reducer: {
      timeSpan: timeSpanReducer,
      subheader: subheaderReducer,
      [teamApi.reducerPath]: teamApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(teamApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
