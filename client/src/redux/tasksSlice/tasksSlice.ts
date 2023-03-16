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
  "tasks/get_tasks",
  async ({ project_id, token }: IGetTasks) => {
    try {
      const tasks = await axios.post(
        "http://localhost:9000/tasks/get_tasks",
        { project_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return tasks.data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface ISetTask {
  project_id: any;
  taskName: string;
  taskDescription: string;
  color: string | null;
  status: string | null;
  subTasks?: string[];
  taskAssignee: { id: number; email: string }[];
  taskBlocker?: number[];
}
export const setTask = createAsyncThunk(
  "tasks/set_task",
  async ({
    project_id,
    taskName,
    taskDescription,
    color,
    status,
    subTasks,
    taskAssignee,
    taskBlocker,
  }: ISetTask) => {
    try {
      const token: string | null = localStorage.getItem("token");
      if (!token) return;
      const tasks = await axios.post(
        "http://localhost:9000/tasks/set_task",
        {
          project_id,
          taskName,
          taskDescription,
          color,
          status,
          subTasks,
          taskAssignee,
          taskBlocker,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return tasks.data;
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
        if (action.payload.length === 0)
          return { ...state, isEmptyStateTask: true };
        return { ...state, tasks: action.payload, isEmptyStateTask: false };
      })
      .addCase(getTasks.rejected, (state) => {});
    builder
      .addCase(setTask.pending, (state, action) => {})
      .addCase(setTask.fulfilled, (state, action) => {
        return { ...state, isEmptyStateTask: false };
      })
      .addCase(setTask.rejected, (state) => {});
  },
});

export const { toggleIsEmptyStateProject, toggleIsEmptyStateTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
