import { createSlice } from "@reduxjs/toolkit";
import { addBalanceToUser, getUserWalletTransactions } from "./action";

interface WalletState {}

const initialState: WalletState = {};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserWalletTransactions.fulfilled, () => {});
    builder.addCase(addBalanceToUser.fulfilled, () => {});
  },
});

export { getUserWalletTransactions, addBalanceToUser };
export default walletSlice.reducer;
