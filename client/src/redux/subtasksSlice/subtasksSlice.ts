import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ISubtasks } from "../../helpers/interface";

export interface subtasksState {
  subtasks: ISubtasks[];
}

const initialState: subtasksState = {
  subtasks: [],
};

export const setGoalStartDateForSubtask = createAsyncThunk(
  "subtasks/set_goal_start_date",
  async ({
    date,
    subtaskId,
  }: {
    date: string | null;
    subtaskId: number | null;
  }) => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;
    try {
      const subtasks = await axios.post(
        "http://localhost:9000/subtasks/set_goal_start_date",
        { date, subtaskId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return subtasks.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const setGoalEndDateForSubtask = createAsyncThunk(
  "subtasks/set_goal_end_date",
  async ({
    date,
    subtaskId,
  }: {
    date: string | null;
    subtaskId: number | null;
  }) => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;
    try {
      const subtasks = await axios.post(
        "http://localhost:9000/subtasks/set_goal_end_date",
        { date, subtaskId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return subtasks.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSubtask = createAsyncThunk(
  "subtasks/get_subtask",
  async (taskId: number) => {
    try {
      const subtasks = await axios.get(
        `http://localhost:9000/subtasks/get_subtask/${taskId}`,
        {}
      );
      return subtasks.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteSubtask = createAsyncThunk(
  "subtasks/delete_subtask",
  async (subtaskId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/subtasks/delete_subtask/${subtaskId}`,
        {}
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const subtasksSlice = createSlice({
  name: "subtasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubtask.pending, (state, action) => {})
      .addCase(getSubtask.fulfilled, (state, action) => {
        return { ...state, subtasks: action.payload };
      })
      .addCase(getSubtask.rejected, (state) => {});
    builder
      .addCase(setGoalStartDateForSubtask.pending, (state, action) => {})
      .addCase(setGoalStartDateForSubtask.fulfilled, (state, action) => {
        return { ...state, subtasks: action.payload };
      })
      .addCase(setGoalStartDateForSubtask.rejected, (state) => {});
    builder
      .addCase(setGoalEndDateForSubtask.pending, (state, action) => {})
      .addCase(setGoalEndDateForSubtask.fulfilled, (state, action) => {
        return { ...state, subtasks: action.payload };
      })
      .addCase(setGoalEndDateForSubtask.rejected, (state) => {});
    builder
      .addCase(deleteSubtask.pending, (state, action) => {})
      .addCase(deleteSubtask.fulfilled, (state, action) => {
        return { ...state, subtasks: action.payload };
      })
      .addCase(deleteSubtask.rejected, (state) => {});
  },
});

export const {} = subtasksSlice.actions;

export default subtasksSlice.reducer;
