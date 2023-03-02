import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";

export interface IProjects {
  projectSpaceName?: string;
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
  projects: [
    {
      projectSpaceName: "Test space",
      projectName: "todo test 1",
      projectMembers: ["test@gmail.com", "test2@gmail.com"],
      projectTasks: ["first task", "second tasks"],
      projectDescription: "first test project description",
    },
    {
      projectSpaceName: "Test space",
      projectName: "crud test",
      projectMembers: ["test3@gmail.com", "test5@gmail.com"],
      projectTasks: ["second task 1", "second tasks 2"],
      projectDescription: "second test project description",
    },
  ],
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
