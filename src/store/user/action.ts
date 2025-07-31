import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/apis";
import type { UserResponse } from "@/lib/types";

// Wallet type (expand transactions if needed)
export interface Wallet {
  id: string;
  balance: number;
  transactions: any[]; // You can type this better later
}

// User type with all fields returned by the API
export interface User {
  id: string;
  name: string | null;
  gender: string | null;
  birthDate: string | null;
  birthTime: string | null;
  birthPlace: string | null;
  latitude: string | null;
  longitude: string | null;
  imgUri: string | null;
  mobile: string;
  role: string;
  wallet: Wallet;
  createdAt: string;
  updatedAt: string;
}

// Response type for getUserByMobile
export interface GetUserByMobileResponse {
  msg: string;
  success: boolean;
  user: User;
}

// GET all users
export const getUsers = createAsyncThunk<User[], void, { rejectValue: any }>(
  "user/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/users");
      return response.data; // Assumes response.data is User[]
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// GET user by mobile number
export const getUserByMobile = createAsyncThunk<
  UserResponse,
  string,
  { rejectValue: any }
>("user/getByMobile", async (mobile, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/v1/users/${mobile}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});



export const resetUserPassword = createAsyncThunk<
  any,
  string,
  { rejectValue: any }
>(
  "user/resetPassword",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/admin/reset-password/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);