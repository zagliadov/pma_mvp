import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ITask } from "../../helpers/interface";
export interface tasksState {
  isEmptyStateProject: boolean;
  isEmptyStateTask: boolean;
  tasks: ITask[];
}

const initialState: tasksState = {
  isEmptyStateProject: true,
  isEmptyStateTask: true,
  tasks: [],
};

export const getTasks = createAsyncThunk(
  "tasks/get_tasks",
  async (projectId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    try {
      const response = await axios.post(
        "http://localhost:9000/tasks/get_tasks",
        { projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const orderByDesc = createAsyncThunk(
  "tasks/order_by_desc",
  async (project_id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/tasks/order_by_desc/${project_id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const orderByAsc = createAsyncThunk(
  "tasks/order_by_asc",
  async (project_id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/tasks/order_by_asc/${project_id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

interface ISetGoalStartDate {
  date: string | null;
  taskId: number | null;
}

export const setGoalStartDate = createAsyncThunk(
  "tasks/set_goal_start_date",
  async ({ date, taskId }: ISetGoalStartDate) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    try {
      const response = await axios.post(
        "http://localhost:9000/tasks/set_goal_start_date",
        { date, taskId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

interface ISetGoalEndDateParams {
  date: string | null;
  taskId: number | null;
}

export const setGoalEndDate = createAsyncThunk(
  "tasks/set_goal_end_date",
  async ({ date, taskId }: ISetGoalEndDateParams) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    try {
      const response = await axios.post(
        "http://localhost:9000/tasks/set_goal_end_date",
        { date, taskId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const removeTask = createAsyncThunk(
  "tasks/remove_task",
  async (task_id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.delete(
        `http://localhost:9000/tasks/remove_task/${task_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

interface ISetTask {
  project_id: number;
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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.post(
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
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
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
    builder
      .addCase(setGoalStartDate.pending, (state, action) => {})
      .addCase(setGoalStartDate.fulfilled, (state, action) => {
        return { ...state, tasks: action.payload };
      })
      .addCase(setGoalStartDate.rejected, (state) => {});
    builder
      .addCase(setGoalEndDate.pending, (state, action) => {})
      .addCase(setGoalEndDate.fulfilled, (state, action) => {
        return { ...state, tasks: action.payload };
      })
      .addCase(setGoalEndDate.rejected, (state) => {});
    builder
      .addCase(orderByDesc.pending, (state, action) => {})
      .addCase(orderByDesc.fulfilled, (state, action) => {
        return { ...state, tasks: action.payload };
      })
      .addCase(orderByDesc.rejected, (state) => {});
    builder
      .addCase(orderByAsc.pending, (state, action) => {})
      .addCase(orderByAsc.fulfilled, (state, action) => {
        return { ...state, tasks: action.payload };
      })
      .addCase(orderByAsc.rejected, (state) => {});
    builder
      .addCase(removeTask.pending, (state, action) => {})
      .addCase(removeTask.fulfilled, (state, action) => {
        return { ...state, tasks: action.payload };
      })
      .addCase(removeTask.rejected, (state) => {});
  },
});

export const { toggleIsEmptyStateProject, toggleIsEmptyStateTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
