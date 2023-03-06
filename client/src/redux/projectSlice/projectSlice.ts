import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import axios from "axios";

export interface IProjects {
  id: number;
  name: string;
}
export interface projectState {
  isEmptyStateProject: boolean;
  isEmptyStateTask: boolean;
  projects: IProjects[];
}

const initialState: projectState = {
  isEmptyStateProject: true,
  isEmptyStateTask: true,
  projects: [],
};

interface IGetProjects {
  workspaces_id: number;
  token: string;
}
export const getProjects = createAsyncThunk(
  "auth/get_projects",
  async ({ workspaces_id, token }: IGetProjects) => {
    try {
      const projects = await axios.post(
        "http://localhost:9000/api/projects/get_projects",
        { workspaces_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return projects.data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface IAddNewProject {
  workspace_id: number;
  token: string;
  name: string;
  members: string[];
  description: string;
}

export const addNewProject = createAsyncThunk(
  "auth/add_new_project",
  async ({
    workspace_id,
    token,
    name,
    members,
    description,
  }: IAddNewProject) => {
    try {
      const projects = await axios.post(
        "http://localhost:9000/api/projects/add_new_project",
        { workspace_id, name, members, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return console.log(projects.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    toggleIsEmptyStateProject: (state, action) => {
      state.isEmptyStateProject = action.payload;
    },
    toggleIsEmptyStateTask: (state, action) => {
      state.isEmptyStateTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {})
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state) => {});
    builder
      .addCase(addNewProject.pending, (state) => {})
      .addCase(addNewProject.fulfilled, (state, action) => {
        // state.projects = action.payload;
      })
      .addCase(addNewProject.rejected, (state) => {});
  },
});

export const { toggleIsEmptyStateProject, toggleIsEmptyStateTask } =
  projectSlice.actions;

export default projectSlice.reducer;
