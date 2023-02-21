import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";

export interface AuthState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
  value: 0,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => { },
});

export const { } = authSlice.actions;

export default authSlice.reducer;
