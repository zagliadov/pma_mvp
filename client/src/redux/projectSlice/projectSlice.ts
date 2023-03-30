import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export interface IProjectMembers {
  email: string;
  id: number;
  project_id: number;
  user_id: number;
}
export interface projectState {
  isEmptyStateProject: boolean;
  isEmptyStateTask: boolean;
  projects: IProjects[];
  project: IProject[];
  project_id: number | null;
  projectMembers: IProjectMembers[];
}

const initialState: projectState = {
  isEmptyStateProject: true,
  isEmptyStateTask: true,
  projects: [],
  project: [],
  project_id: null,
  projectMembers: [],
};

interface IGetProjects {
  workspaces_id: number;
  token: string;
}
export const getProjects = createAsyncThunk(
  "projects/get_projects",
  async ({ workspaces_id, token }: IGetProjects) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/projects/get_projects`,
        { workspaces_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProject = createAsyncThunk(
  "projects/get_project",
  async (project_id: number) => {
    const token: string | null = localStorage?.getItem("token");
    if (!token) return;
    try {
      const project = await axios.post(
        "http://localhost:9000/projects/get_project",
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
  "projects/add_new_project",
  async ({
    workspace_id,
    token,
    name,
    members,
    description,
  }: IAddNewProject) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/projects/add_new_project",
        { workspace_id, name, members, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface IGetProjectMembers {
  project_id: number;
  token: string;
}
export const getProjectMembers = createAsyncThunk(
  "projects/get_project_members",
  async ({ project_id, token }: IGetProjectMembers) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/projects/get_project_members",
        { project_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
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
        return { ...state, project_id: action.payload };
      })
      .addCase(addNewProject.rejected, (state) => {});
    builder
      .addCase(getProjectMembers.pending, (state) => {})
      .addCase(getProjectMembers.fulfilled, (state, action) => {
        return { ...state, projectMembers: action.payload };
      })
      .addCase(getProjectMembers.rejected, (state) => {});
  },
});
export const { toggleIsEmptyStateProject, toggleIsEmptyStateTask } =
  projectSlice.actions;

export default projectSlice.reducer;
