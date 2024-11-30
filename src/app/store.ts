import type { Action, ThunkAction } from '@reduxjs/toolkit';

import { configureStore } from '@reduxjs/toolkit';

import filmReducer from '../features/film/film-slice';

export const store = configureStore({
  reducer: {
    films: filmReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
