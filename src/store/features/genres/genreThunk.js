import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import { getHeaders } from "../../../utils/getHeaders";

const API_URL = "/api/v1/genres";

export const createGenre = createAsyncThunk(
  "genres/createGenre",
  async (genreData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/create`, genreData, {
        headers: getHeaders(),
      });
      console.log("Created genres: ", response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(
        err.response?.data?.message || "Failed to create genre",
      );
    }
  },
);

export const updateGenre = createAsyncThunk(
  "genres/updateGenre",
  async ({ genreId, genreData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${genreId}`, genreData, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(
        err.response?.data?.message || "Failed to update genre",
      );
    }
  },
);

export const deleteGenre = createAsyncThunk(
  "genres/deleteGenres",
  async ({ genreId, hard = false }, { rejectWithValue }) => {
    try {
      const url = hard ? `${API_URL}/${genreId}/hard` : `${API_URL}/${genreId}`;
      await api.delete(url, {
        headers: getHeaders(),
      });
      return { genreId };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete genre",
      );
    }
  },
);

export const fetchGenres = createAsyncThunk(
  "genres/fetchGenres",
  async ({ searchTerm, page, size }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/search`, {
        headers: getHeaders(),
        params: { searchTerm, page, size },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch genres",
      );
    }
  },
);

export const fetchActiveGenres = createAsyncThunk(
  "genre/activeGenre",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/active`, {
        headers: getHeaders(),
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch active genre",
      );
    }
  },
);
