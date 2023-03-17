import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import axios from "axios";

export interface IStatusArray {
  id: number;
  color: string;
  status: string;
}
interface IInitialState {
  statuses: IStatusArray[];
  colors: string[];
}
const initialState: IInitialState = {
  statuses: [],
  colors: ["#7ec770", "#f4dc40", "#fdae4b", "#ed7668", "#cc90e3", "#8dbed8"],
};

interface IGetStatuses {
  token: string;
}
export const getStatuses = createAsyncThunk(
  "status/get_statuses",
  async ({ token }: IGetStatuses) => {
    try {
      const statuses = await axios.post(
        "http://localhost:9000/status/get_statuses",
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
  "status/get_status",
  async ({ status_id, token }: IGetStatus) => {
    try {
      const status = await axios.post(
        "http://localhost:9000/status/get_status",
        { status_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return status?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface ISetStatus {
  color: string;
  status: string;
  token: string;
}
export const setStatus = createAsyncThunk(
  "status/set_status",
  async ({ color, status, token }: ISetStatus) => {
    try {
      const statuses = await axios.post(
        "http://localhost:9000/status/set_status",
        { color, status },
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

interface IUpdateStatus {
  color: string;
  status: string;
  token: string;
  id: number;
}
export const updateStatus = createAsyncThunk(
  "status/update_status",
  async ({ color, status, token, id }: IUpdateStatus) => {
    try {
      const statuses = await axios.post(
        "http://localhost:9000/status/update_status",
        { color, status, id },
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

interface IRemoveStatus {
  token: string;
  id: number;
}
export const removeStatus = createAsyncThunk(
  "status/update_status",
  async ({ token, id }: IRemoveStatus) => {
    try {
      const statuses = await axios.post(
        "http://localhost:9000/status/remove_status",
        { id },
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
        return { ...state, statuses: action.payload };
      })
      .addCase(getStatuses.rejected, (state) => {});
    builder
      .addCase(getStatus.pending, (state, action) => {})
      .addCase(getStatus.fulfilled, (state, action) => {
        // if (action.payload.length === 0) return;
        // return { ...state, editStatus: action.payload };
      })
      .addCase(getStatus.rejected, (state) => {});
    builder
      .addCase(setStatus.pending, (state, action) => {})
      .addCase(setStatus.fulfilled, (state, action) => {})
      .addCase(setStatus.rejected, (state) => {});
    builder
      .addCase(updateStatus.pending, (state, action) => {})
      .addCase(updateStatus.fulfilled, (state, action) => {
        return { ...state, statuses: action.payload };
      })
      .addCase(updateStatus.rejected, (state) => {});
  },
});

export const {} = statusSlice.actions;

export default statusSlice.reducer;
