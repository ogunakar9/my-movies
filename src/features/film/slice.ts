import type {
  IDetailQueryParameters,
  IFilmDataState,
  IFilmDetailData,
  IFilmState
} from '@/lib/types/film';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/features/film/api';

import { type RootState } from '../../app/store';

const initialState: IFilmState = {
  query: {
    s: 'Pokemon',
    y: '',
    type: '',
    page: 1
  },
  status: 'idle',
  filmData: {} as IFilmDataState,
  error: undefined,
  selectedFilm: {} as IFilmDetailData,
  hasNextPage: false
};

// Async Thunks
export const getFilmsWithParameters = createAsyncThunk(
  'films/fetchFilms',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const query = state.films.query;

      const response = await api.get('/', { params: query });
      return response.data as IFilmDataState;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorResponse = (error as { response?: { data?: unknown } })?.response;
        return rejectWithValue(errorResponse?.data ?? error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const getFilmDetail = createAsyncThunk(
  'films/fetchFilmDetail',
  async (parameters: IDetailQueryParameters, { rejectWithValue }) => {
    try {
      const response = await api.get('/', { params: parameters });
      return response.data as IFilmDetailData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorResponse = (error as { response?: { data?: unknown } })?.response;
        return rejectWithValue(errorResponse?.data ?? error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const handlePending = (state: IFilmState) => {
  state.status = 'loading';
  state.error = undefined;
};

export const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<IFilmState['query']>>) => {
      state.query = { ...state.query, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilmsWithParameters.pending, handlePending)
      .addCase(getFilmsWithParameters.fulfilled, (state, action) => {
        state.status = 'success';
        state.filmData = action.payload;

        // Calculate hasNextPage
        const totalResults = action.payload.totalResults || 0;
        const itemsPerPage = 10;
        const currentPage = state.query.page;

        state.hasNextPage = currentPage * itemsPerPage < Number(totalResults);
      })
      .addCase(getFilmsWithParameters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
      })
      .addCase(getFilmDetail.pending, handlePending)
      .addCase(getFilmDetail.fulfilled, (state, action) => {
        state.status = 'success';
        state.selectedFilm = action.payload;
      })
      .addCase(getFilmDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
      });
  }
});

export const { updateFilters } = filmSlice.actions;

export const selectFilters = (state: RootState) => state.films.query;
export const selectFilmData = (state: RootState) => state.films.filmData;
export const selectSelectedFilm = (state: RootState) => state.films.selectedFilm;
export const selectStatus = (state: RootState) => state.films.status;
export const selectError = (state: RootState) => state.films.error;
export const selectHasNextPage = (state: RootState) => state.films.hasNextPage;

export default filmSlice.reducer;
