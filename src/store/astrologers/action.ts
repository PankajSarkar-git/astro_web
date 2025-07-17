import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/apis";
import type {
  CreateAstrologerThunkInput,
  EditAstrologerThunkInput,
} from "@/lib/types";

// ------------------ GET ALL ASTROLOGERS ------------------
export const getAstrologers = createAsyncThunk(
  "astrologer/getAll",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/astrologers?page=${page}`);
      return response.data; // { astrologers, totalPages, currentPage }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ------------------ CREATE ASTROLOGER ------------------
export const createAstrologer = createAsyncThunk(
  "astrologer/create",
  async (
    { astrologerData, imageFile }: CreateAstrologerThunkInput,
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(astrologerData)], {
          type: "application/json",
        })
      );
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await api.post("/api/v1/admin/astrologer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ------------------ EDIT ASTROLOGER ------------------
export const editAstrologer = createAsyncThunk(
  "astrologer/edit",
  async (
    { id, astrologerData, imageFile }: EditAstrologerThunkInput,
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(astrologerData)], {
          type: "application/json",
        })
      );
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await api.put(
        `/api/v1/astrologers/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ------------------ GET ASTROLOGER BY ID ------------------
export const getAstrologerById = createAsyncThunk(
  "astrologer/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/astrologers/${id}`);
      return response.data; // contains { astrologer: {...} }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ------------------ DELETE ASTROLOGER ------------------
export const deleteAstrologer = createAsyncThunk(
  "astrologer/delete",
  async (astrologerId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/api/v1/admin/astrologer/${astrologerId}`
      );
      return { id: astrologerId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
