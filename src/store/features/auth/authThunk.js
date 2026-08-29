import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

const API_URL = "/auth";

// ASYNC THUNK
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/login`, { email, password });
      const { token, ...user } = response.data;

      // store token consistently
      localStorage.setItem("jwt", token);
      localStorage.setItem("token", token);
      return { token, user };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  },
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ userData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/signup`, userData);
      const { token, ...user } = response.data;

      localStorage.setItem("jwt", token);
      localStorage.setItem("token", token);
      return { token, user };
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await api.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch current user.",
      );
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/forgot-password`, { email });
      console.log("forgot password", response);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to send link to reset password",
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/reset-password`, {
        token,
        newPassword,
      });
      console.log("Reset password", response);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to reset password",
      );
    }
  },
);
