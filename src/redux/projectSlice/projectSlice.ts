import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";

export interface projectState {
  isEmptyState: boolean;
};

const initialState: projectState = {
  isEmptyState: true,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.isAuthenticated = false;
    // },
  },
  extraReducers: (builder) => {},
});

export const {  } = projectSlice.actions;

export default projectSlice.reducer;
