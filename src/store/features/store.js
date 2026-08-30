import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import genreReducer from "./genres/genreSlice";
import bookReducer from "./books/bookSlice";
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
