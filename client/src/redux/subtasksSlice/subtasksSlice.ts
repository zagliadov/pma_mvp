import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface tasksState {
  subtasks: any;
}

const initialState: any = {
  subtasks: [],
};

export const getSubtask = createAsyncThunk("subtasks/get_subtask", async (taskId: number) => {
  try {
    const subtasks = await axios.get(
      `http://localhost:9000/subtasks/get_subtask/${taskId}`,
      {}
    );
    return subtasks.data;
  } catch (error) {
    console.log(error);
  }
});

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
  },
});

export const {} = subtasksSlice.actions;

export default subtasksSlice.reducer;
