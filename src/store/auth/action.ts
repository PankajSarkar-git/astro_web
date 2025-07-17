import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/apis";

export type LoginPayload = {
  mobile: string;
};

export type VerifyPayload = {
  mobile: string;
  otp: string;
};

export interface User {
  name: string;
  mobile: string;
  role: string;
  walletBalance: number;
  id: string;
}

export interface VerifyOtpResponse {
  token: string;
  user: User;
}

export const loginUser = createAsyncThunk<
  { success: boolean; otp: string; msg: string }, // response type
  LoginPayload,
  { rejectValue: any }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/v1/auth/login", payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const verifyOtp = createAsyncThunk<
  VerifyOtpResponse,
  VerifyPayload,
  { rejectValue: any }
>("auth/login/verify", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/v1/auth/verify-otp", payload);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
