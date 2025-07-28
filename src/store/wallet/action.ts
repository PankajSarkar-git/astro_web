import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/apis";
import type { WalletResponse } from "@/lib/types";

export const getUserWalletTransactions = createAsyncThunk<
  WalletResponse,
  { userId: string; page?: number },
  { rejectValue: any }
>("wallet/getByUser", async ({ userId, page = 1 }, { rejectWithValue }) => {
  try {
    const response = await api.get(
      `/api/v1/admin/wallet/${userId}?page=${page}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getPaymentWithdrawalsRequest = createAsyncThunk<
  any,
  { page?: number },
  { rejectValue: any }
>("wallet/PaymentWithdrawalsRequest", async ({ page = 1 }, { rejectWithValue }) => {
  try {
    const response = await api.get(
      `/api/v1/withdraw?page=${page}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getPaymentWithdrawal = createAsyncThunk<
  any,
  { id: string },
  { rejectValue: any }
>("wallet/getPaymentWithdrawal", async ({ id = '' }, { rejectWithValue }) => {
  try {
    const response = await api.get(
      `/api/v1/withdraw/approve/${id}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const addBalanceToUser = createAsyncThunk<
  any,
  { mobile: string; amount: number },
  { rejectValue: any }
>(
  "wallet/addBalanceToUser",
  async ({ mobile, amount }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/v1/admin/add-balance", {
        mobile,
        amount,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
