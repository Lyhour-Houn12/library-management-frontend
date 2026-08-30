import { createSlice } from "@reduxjs/toolkit";
import {
  createGenre,
  deleteGenre,
  fetchActiveGenres,
  fetchGenres,
  updateGenre,
} from "./genreThunk";

const initialState = {
  genres: [],
  activeGenres: [],
  genreHierarchy: [],
  topLevelGenres: [],
  subGenres: [],
  currentGenre: null,
  paginatedGenres: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 10,
    page: 0,
    isFirst: true,
    isLast: false,
    isEmpty: false,
  },
  searchResults: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 10,
    page: 0,
    isFirst: true,
    isLast: false,
    isEmpty: false,
  },
  loading: false,
  actionLoading: false,
  error: null,
};

const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGenre.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createGenre.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.error = null;
        state.genres.push(action.payload);
      })
      .addCase(createGenre.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(updateGenre.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateGenre.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.error = null;
        const index = state.genres.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) {
          state.genres[index] = action.payload;
        }
        if (state.currentGenre?.id === action.payload.id) {
          state.currentGenre = action.payload;
        }
      })
      .addCase(updateGenre.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteGenre.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deleteGenre.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.error = null;
        state.genres = state.genres.filter(
          (g) => g.id !== action.payload.genreId,
        );
      })
      .addCase(deleteGenre.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchActiveGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.activeGenres = action.payload;
      })
      .addCase(fetchActiveGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH GENRES AND SEARCH
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        const content = action.payload?.content ?? [];

        state.loading = false;
        state.genres = content;
        state.paginatedGenres = {
          content,
          totalPages: action.payload?.totalPages ?? 0,
          totalElements: action.payload?.totalElements ?? 0,
          size: action.payload?.pageSize ?? 10,
          page: action.payload?.pageNumber ?? 1,
          isFirst: action.payload?.firstPage ?? true,
          isLast: action.payload?.lastPage ?? false,
          isEmpty: action.payload?.empty ?? true,
        };
        state.error = null;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default genreSlice.reducer;
