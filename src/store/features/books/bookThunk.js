import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import { getHeaders } from "../../../utils/getHeaders";

const API_URL = "/api/v1/books";

export const createBook = createAsyncThunk(
  "books/createBooks",
  async ({ bookData, coverImageFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append(
        "book",
        new Blob([JSON.stringify(bookData)], { type: "application/json" }),
      );

      formData.append("coverImage", coverImageFile);

      const response = await api.post(`/api/admin/books`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create book",
      );
    }
  },
);
