import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import axios from "axios";

export interface IProjects {
  id: number;
  name: string;
}

interface IProject {
  workspace_id: number;
  name: string;
  description: string;
}
export interface projectState {
  isEmptyStateProject: boolean;
  isEmptyStateTask: boolean;
  projects: IProjects[];
  project: IProject[];
}

const initialState: projectState = {
  isEmptyStateProject: true,
  isEmptyStateTask: true,
  projects: [],
  project: [],
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
      return projects?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface IGetProject {
  project_id: number;
  token: string;
}
export const getProject = createAsyncThunk(
  "auth/get_project",
  async ({ project_id, token }: IGetProject) => {
    try {
      const project = await axios.post(
        "http://localhost:9000/api/projects/get_project",
        { project_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return project?.data;
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
      .addCase(getProjects.pending, (state, action) => {})
      .addCase(getProjects.fulfilled, (state, action) => {
        return { ...state, projects: action.payload };
      })
      .addCase(getProjects.rejected, (state) => {});
    builder
      .addCase(getProject.pending, (state, action) => {})
      .addCase(getProject.fulfilled, (state, action) => {
        return { ...state, project: action.payload };
      })
      .addCase(getProject.rejected, (state) => {});
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
