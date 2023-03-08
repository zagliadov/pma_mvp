import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import axios from "axios";

export interface tasksState {
  isEmptyStateProject: boolean;
  isEmptyStateTask: boolean;
  tasks: any;
}

const initialState: any = {
  isEmptyStateProject: true,
  isEmptyStateTask: true,
  tasks: [],
};

interface IGetTasks {
  project_id: number;
  token: string;
}

export const getTasks = createAsyncThunk(
  "auth/get_tasks",
  async ({ project_id, token }: IGetTasks) => {
    try {
      const tasks = await axios.post(
        "http://localhost:9000/api/tasks/get_tasks",
        { project_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return tasks?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
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
      .addCase(getTasks.pending, (state, action) => {})
      .addCase(getTasks.fulfilled, (state, action) => {
        if (action.payload.length === 0) return { ...state, isEmptyStateTask: true};
        return { ...state, tasks: action.payload, isEmptyStateTask: false };
      })
      .addCase(getTasks.rejected, (state) => {});
  },
});

export const { toggleIsEmptyStateProject, toggleIsEmptyStateTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
