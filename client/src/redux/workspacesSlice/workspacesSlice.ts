import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import axios from "axios";

export interface IWorkspaces {
  id: number;
  user_id: number;
  name: string;
}

export interface workspacesState {
  isEmptyStateProject: boolean;
  isEmptyStateTask: boolean;
  workspaces: IWorkspaces[];
}

const initialState: workspacesState = {
  isEmptyStateProject: true,
  isEmptyStateTask: true,
  workspaces: [],
};

export const getWorkspaces = createAsyncThunk(
  "workspace/get_workspaces",
  async (token: string) => {
    try {
      const workspaces = await axios.post(
        "http://localhost:9000/workspaces/get_workspaces",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return workspaces.data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface IAddNewWorkspace {
  token: string;
  workspace_name: string;
}
export const addNewWorkspace = createAsyncThunk(
  "workspace/add_new_workspace",
  async ({ token, workspace_name }: IAddNewWorkspace) => {
    try {
      const workspaces = await axios.post(
        "http://localhost:9000/workspaces/add_new_workspace",
        { workspace_name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return workspaces.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const workspacesSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkspaces.pending, (state) => {})
      .addCase(getWorkspaces.fulfilled, (state, action) => {
        return { ...state, workspaces: action.payload };
      })
      .addCase(getWorkspaces.rejected, (state) => {});
    builder
      .addCase(addNewWorkspace.pending, (state) => {})
      .addCase(addNewWorkspace.fulfilled, (state, action) => {
        return { ...state, workspaces: action.payload };
      })
      .addCase(addNewWorkspace.rejected, (state) => {});
  },
});

export const {} = workspacesSlice.actions;

export default workspacesSlice.reducer;
