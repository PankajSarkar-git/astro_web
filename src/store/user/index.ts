import { createSlice } from "@reduxjs/toolkit";
import { getUserByMobile, getUsers } from "../user/action";

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getUserByMobile.fulfilled, () => {});
  },
});

export default userSlice.reducer;
export { getUsers, getUserByMobile };
