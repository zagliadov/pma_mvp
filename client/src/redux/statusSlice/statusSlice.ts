import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import axios from "axios";

interface IInitialState {
  statuses: string[];
}
const initialState: IInitialState = {
  statuses: [],
};

interface IGetStatuses {
  token: string;
}
export const getStatuses = createAsyncThunk(
  "auth/get_statuses",
  async ({ token }: IGetStatuses) => {
    try {
      const statuses = await axios.post(
        "http://localhost:9000/api/tasks/get_statuses",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return statuses?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface IGetStatus {
  status_id: number;
  token: string;
}
export const getStatus = createAsyncThunk(
  "auth/get_status",
  async ({ status_id, token }: IGetStatus) => {
    try {
      const statuses = await axios.post(
        "http://localhost:9000/api/tasks/get_status",
        { status_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return statuses?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface ISetStatus {
  status: number;
  token: string;
}
export const setStatus = createAsyncThunk(
  "auth/set_status",
  async ({ status, token }: ISetStatus) => {
    try {
      const statuses = await axios.post(
        "http://localhost:9000/api/tasks/set_status",
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return statuses?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatuses.pending, (state, action) => {})
      .addCase(getStatuses.fulfilled, (state, action) => {
        // if (action.payload.length === 0) return { ...state, isEmptyStateTask: true};
        // return { ...state, tasks: action.payload, isEmptyStateTask: false };
      })
      .addCase(getStatuses.rejected, (state) => {});
    builder
      .addCase(getStatus.pending, (state, action) => {})
      .addCase(getStatus.fulfilled, (state, action) => {
        // if (action.payload.length === 0) return { ...state, isEmptyStateTask: true};
        // return { ...state, tasks: action.payload, isEmptyStateTask: false };
      })
      .addCase(getStatus.rejected, (state) => {});
    builder
      .addCase(setStatus.pending, (state, action) => {})
      .addCase(setStatus.fulfilled, (state, action) => {
        // if (action.payload.length === 0) return { ...state, isEmptyStateTask: true};
        // return { ...state, tasks: action.payload, isEmptyStateTask: false };
      })
      .addCase(setStatus.rejected, (state) => {});
  },
});

export const {} = statusSlice.actions;

export default statusSlice.reducer;
