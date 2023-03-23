import { createSlice } from "@reduxjs/toolkit";

export interface diffState {
  isActiveSidebar: boolean;
  isAssigneeModalOpen: boolean;
  isCreateTaskModal: boolean;
  isBlockingTasksModalOpen: boolean;
  isStatusModalOpen: boolean;
}

const initialState: diffState = {
  isActiveSidebar: false,
  isAssigneeModalOpen: false,
  isCreateTaskModal: false,
  isBlockingTasksModalOpen: false,
  isStatusModalOpen: false,
};

export const diffSlice = createSlice({
  name: "diff",
  initialState,
  reducers: {
    toggleIsActiveSidebar: (state, action) => {
      return { ...state, isActiveSidebar: action.payload };
    },
    toggleIsAssigneeModalOpen: (state, action) => {
      return { ...state, isAssigneeModalOpen: action.payload };
    },
    toggleIsCreateTaskModal: (state, action) => {
      return { ...state, isCreateTaskModal: action.payload };
    },
    toggleIsBlockingTasksModalOpen: (state, action) => {
      return { ...state, isBlockingTasksModalOpen: action.payload };
    },
    toggleIsStatusModalOpen: (state, action) => {
      return { ...state, isStatusModalOpen: action.payload };
    },
  },
  extraReducers: (builder) => {},
});

export const {
  toggleIsActiveSidebar,
  toggleIsAssigneeModalOpen,
  toggleIsCreateTaskModal,
  toggleIsBlockingTasksModalOpen,
  toggleIsStatusModalOpen,
} = diffSlice.actions;

export default diffSlice.reducer;
