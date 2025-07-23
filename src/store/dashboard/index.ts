// statsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { Stats, MonthlyProfit } from "@/lib/types";
import { fetchMonthlyProfit, fetchStats } from "./action";

interface dashboardState {
  stats: Stats | null;
  monthlyProfits: MonthlyProfit[];
  loading: {
    stats: boolean;
    monthly: boolean;
  };
}

const initialState: dashboardState = {
  stats: null,
  monthlyProfits: [],
  loading: {
    stats: false,
    monthly: false,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading.stats = true;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats = action.payload.stats;
        state.loading.stats = false;
      })
      .addCase(fetchStats.rejected, (state) => {
        state.loading.stats = false;
      })

      .addCase(fetchMonthlyProfit.pending, (state) => {
        state.loading.monthly = true;
      })
      .addCase(fetchMonthlyProfit.fulfilled, (state, action) => {
        state.monthlyProfits = action.payload.monthlyProfits;
        state.loading.monthly = false;
      })
      .addCase(fetchMonthlyProfit.rejected, (state) => {
        state.loading.monthly = false;
      });
  },
});

export default dashboardSlice.reducer;
