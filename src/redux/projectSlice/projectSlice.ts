import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";

interface IProjects {
  projectName: string;
  projectMembers: string[];
  projectTasks: string[];
  projectDescription: string;
};
export interface projectState {
  isEmptyState: boolean;
  projects: IProjects[];
};

const initialState: projectState = {
  isEmptyState: true,
  projects: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.isAuthenticated = false;
    // },
    addProject: (state, action: PayloadAction<IProjects>) => {
      state.projects.push(action.payload);
    },
  },
  extraReducers: (builder) => {},
});

export const { addProject } = projectSlice.actions;

export default projectSlice.reducer;
