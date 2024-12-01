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
    apikey: import.meta.env.VITE_API_KEY as string,
    s: 'Pokemon',
    y: '',
    type: '',
    page: 1
  },
  status: 'idle',
  filmData: {} as IFilmDataState,
  error: undefined,
  selectedFilm: {} as IFilmDetailData
};

// Async Thunks
export const getFilmsWithParameters = createAsyncThunk(
  'films/fetchFilms',
  async (_, { getState, rejectWithValue }) => {
    try {
      // Get the current query parameters from Redux state
      const state = getState() as RootState;
      const query = state.films.query;

      // Perform the API request
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

export const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    updateSearchInput: (state, action: PayloadAction<string>) => {
      state.query.s = action.payload;
    },
    updateTypeSelector: (state, action: PayloadAction<string>) => {
      state.query.type = action.payload;
    },
    updateYearSelector: (state, action: PayloadAction<string>) => {
      state.query.y = action.payload;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.query.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilmsWithParameters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFilmsWithParameters.fulfilled, (state, action) => {
        state.status = 'success';
        state.filmData = action.payload;
      })
      .addCase(getFilmsWithParameters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getFilmDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFilmDetail.fulfilled, (state, action) => {
        state.status = 'success';
        state.selectedFilm = action.payload;
      })
      .addCase(getFilmDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { updateSearchInput, updateTypeSelector, updateYearSelector, updatePage } =
  filmSlice.actions;

export const selectFilters = (state: RootState) => state.films.query;
export const selectFilmData = (state: RootState) => state.films.filmData;
export const selectSelectedFilm = (state: RootState) => state.films.selectedFilm;
export const selectStatus = (state: RootState) => state.films.status;
export const selectError = (state: RootState) => state.films.error;

export default filmSlice.reducer;
