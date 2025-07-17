import { createSlice } from "@reduxjs/toolkit";
import {
  createAstrologer,
  deleteAstrologer,
  editAstrologer,
  getAstrologerById,
  getAstrologers,
} from "./action";

export interface Astrologer {
  id: string;
  name: string;
  expertise: string;
}

interface AstrologerState {
  astrologers: any[];
}

const initialState: AstrologerState = {
  astrologers: [],
};

const astrologerSlice = createSlice({
  name: "astrologer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAstrologers.fulfilled, (state, action) => {
      state.astrologers = action.payload;
    });
    builder.addCase(createAstrologer.fulfilled, (_, action) => {
      if (action.payload.status === 201) {
        return initialState;
      }
    });
    builder.addCase(editAstrologer.fulfilled, (_, action) => {
      if (action.payload.status === 201) {
        return initialState;
      }
    });
    builder.addCase(getAstrologerById.fulfilled, (_, action) => {
      if (action.payload.status === 201) {
        return initialState;
      }
    });
    builder.addCase(deleteAstrologer.fulfilled, (_, action) => {
      if (action.payload.status === 200) {
        return initialState;
      }
    });
  },
});

export { getAstrologers, createAstrologer, deleteAstrologer,editAstrologer,getAstrologerById };

export default astrologerSlice.reducer;
