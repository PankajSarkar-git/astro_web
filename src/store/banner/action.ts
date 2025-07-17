import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/apis";

export const uploadBanner = createAsyncThunk<
  any,
  FormData,
  { rejectValue: any }
>("banner/upload", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/v1/admin/upload-bannar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteBannerById = createAsyncThunk<string, any>(
  "banner/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/v1/admin/bannar/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllBanners = createAsyncThunk<
  any,
  void,
  { rejectValue: any }
>("banner/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/v1/bannar");
    return response.data.banners || response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
