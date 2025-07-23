
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/apis";
import type { StatsResponse, MonthlyProfitResponse } from "@/lib/types";

export const fetchStats = createAsyncThunk<StatsResponse>(
  "stats/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/admin/stats");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMonthlyProfit = createAsyncThunk<
  MonthlyProfitResponse,
  { year?: number },
  { rejectValue: any }
>("stats/fetchMonthlyProfit", async ({ year }, { rejectWithValue }) => {
  try {
    const response = await api.get(
      `/api/v1/admin/monthly-profit-bar${year ? `?year=${year}` : ""}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
