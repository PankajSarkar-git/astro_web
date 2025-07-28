import { createSlice } from "@reduxjs/toolkit";
import { addBalanceToUser, getPaymentWithdrawal, getPaymentWithdrawalsRequest, getUserWalletTransactions } from "./action";

interface WalletState { }

const initialState: WalletState = {};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserWalletTransactions.fulfilled, () => { });
    builder.addCase(addBalanceToUser.fulfilled, () => { });
    builder.addCase(getPaymentWithdrawalsRequest.fulfilled, () => { });
    builder.addCase(getPaymentWithdrawal.fulfilled, () => { });
  },
});

export { getUserWalletTransactions, addBalanceToUser, getPaymentWithdrawalsRequest, getPaymentWithdrawal };
export default walletSlice.reducer;
