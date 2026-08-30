import { createSlice } from "@reduxjs/toolkit";
import { createBook } from "./bookThunk";

const initialState = {
  books: [],
  currentBooks: null,
  searchResults: {
    content: [],
    pageNumber: 0,
    pageSize: 0,
    totalElement: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
    isEmpty: false,
  },
  stats: {
    totalActiveBooks: 0,
    totalAvailableBooks: 0,
    totalUnavailableBooks: 0,
    totalInactiveBooks: 0,
  },
  loading: false,
  actionLoading: false,
  error: null,
  filter: {
    genreId: null,
    availableOnly: null,
    activeOnly: true,
    pageSize: 0,
    pageNumber: 10,
    sortBy: "createdAt",
    sortDirection: "DESC",
  },
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBook.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.error = null;
        state.books.push(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
