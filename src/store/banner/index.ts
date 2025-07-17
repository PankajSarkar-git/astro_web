import { createSlice } from "@reduxjs/toolkit";
import { deleteBannerById, getAllBanners, uploadBanner } from "./action";

const initialState = {};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadBanner.fulfilled, () => {});
    builder.addCase(deleteBannerById.fulfilled, () => {});
    builder.addCase(getAllBanners.fulfilled, () => {});
  },
});

export default bannerSlice.reducer;
export { deleteBannerById, uploadBanner, getAllBanners };
