import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import genreReducer from "./features/genres/genreSlice";
import bookReducer from "./features/books/bookSlice";
/**
 * Redux store configuration for Library Management System
 * Configured with Redux Toolkit
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    genres: genreReducer,
    books: bookReducer,
  },
});

export default store;
