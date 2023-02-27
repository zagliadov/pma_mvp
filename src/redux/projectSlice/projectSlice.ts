import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";

interface IProjects {
  projectName: string;
  projectMembers: string[];
  projectTasks?: string[];
  projectDescription: string;
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
    addProject: (state, action: PayloadAction<IProjects>) => {
      state.projects.push(action.payload);
    },
  },
  extraReducers: (builder) => {},
});

export const { addProject, toggleIsEmptyStateProject, toggleIsEmptyStateTask } =
  projectSlice.actions;

export default projectSlice.reducer;
