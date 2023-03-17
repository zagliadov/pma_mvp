import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import projectReducer from "./projectSlice/projectSlice";
import diffReducer from "./diffSlice/diffSlice";
import workspacesReducer from "./workspacesSlice/workspacesSlice";
import tasksReducer from "./tasksSlice/tasksSlice";
import statusReducer from "./statusSlice/statusSlice";
import userSettingsReducer from "./userSettingsSlice/userSettingsSlice";
import subtasksReducer from "./subtasksSlice/subtasksSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    diff: diffReducer,
    workspaces: workspacesReducer,
    tasks: tasksReducer,
    status: statusReducer,
    user: userSettingsReducer,
    subtasks: subtasksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
