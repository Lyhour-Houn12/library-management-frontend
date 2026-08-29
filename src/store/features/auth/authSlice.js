import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentUser,
  forgotPassword,
  login,
  resetPassword,
  signup,
} from "./authThunk";

const initialState = {
  user: null,
  token: !!localStorage.getItem("jwt") || null,
  isAuthenticated: !!localStorage.getItem("jwt"),
  loading: !!localStorage.getItem("jwt"),
  error: null,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,

  // User list for admin
  users: [],
  usersLoading: false,
  usersError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("jwt");
      localStorage.removeItem("token");
    },
    resetPasswordFlags: (state) => {
      // if we do not initial it, the attributes will stuck forever, so set it to default
      state.forgotPasswordSuccess = false;
      state.resetPasswordSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        ((state.error = null),
          (state.isAuthenticated = true),
          (state.token = action.payload.token));
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = action.payload || action.error.message));
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.error = null),
          (state.isAuthenticated = true),
          (state.user = action.payload.user),
          (state.token = action.payload.token));
      })
      .addCase(signup.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = action.payload || action.error.message));
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = action.payload),
          (state.user = null),
          (state.isAuthenticated = false),
          localStorage.removeItem("jwt"),
          localStorage.removeItem("token"));
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
        state.forgotPasswordSuccess = false;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetPasswordSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.resetPasswordSuccess = false;
      });
  },
});

export const { logout, resetPasswordFlags } = authSlice.actions;
export default authSlice.reducer;
