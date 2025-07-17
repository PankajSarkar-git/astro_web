import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginUser, verifyOtp } from "./action";
import type { VerifyOtpResponse } from "./action";

interface AuthState {
  token: string | null;
  mobile: string | null;
  otp: string;
  role: string;
  walletBalance: number;
  name: string;
  firstTime: boolean;
  userId: string;
}

const initialState: AuthState = {
  token: null,
  mobile: null,
  otp: "",
  role: "",
  name: "",
  walletBalance: 0,
  firstTime: true,
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setMobile: (state, action: PayloadAction<{ mobile: string }>) => {
      state.mobile = action.payload.mobile;
    },
    setFirstTime: (state) => {
      state.firstTime = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        if (payload?.success) {
          state.otp = payload.otp;
        }
      })
      .addCase(
        verifyOtp.fulfilled,
        (state, action: PayloadAction<VerifyOtpResponse>) => {
          const { token, user } = action.payload;
          state.token = token;
          state.name = user.name;
          state.mobile = user.mobile;
          state.role = user.role;
          state.walletBalance = user.walletBalance;
          state.userId = user.id;
        }
      );
  },
});

export const { logout, setMobile, setFirstTime } = authSlice.actions;
export { loginUser, verifyOtp };
export default authSlice.reducer;

