import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";

export interface diffState {
  isActiveSidebar: boolean;
  isAssigneeModalOpen: boolean;
}

const initialState: diffState = {
  isActiveSidebar: false,
  isAssigneeModalOpen: false,
};

export const diffSlice = createSlice({
  name: "diff",
  initialState,
  reducers: {
    toggleIsActiveSidebar: (state, action) => {
      return { ...state, isActiveSidebar: action.payload };
    },
    toggleIsAssigneeModalOpen: (state, action) => {
      return { ...state, isAssigneeModalOpen: action.payload };
    },
  },
  extraReducers: (builder) => {},
});

export const {
  toggleIsActiveSidebar,
  toggleIsAssigneeModalOpen,
} = diffSlice.actions;

export default diffSlice.reducer;
