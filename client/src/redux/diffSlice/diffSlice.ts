import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";


export interface diffState {
  isActiveSidebar: boolean;
}

const initialState: diffState = {
  isActiveSidebar: false,
};

export const diffSlice = createSlice({
  name: "diff",
  initialState,
  reducers: {
    toggleIsActiveSidebar: (state, action) => {
      state.isActiveSidebar = action.payload;
    },

  },
  extraReducers: (builder) => {},
});

export const { toggleIsActiveSidebar } =
  diffSlice.actions;

export default diffSlice.reducer;
