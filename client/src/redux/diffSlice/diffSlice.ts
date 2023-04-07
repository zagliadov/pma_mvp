import { createSlice } from "@reduxjs/toolkit";

export interface diffState {
  isActiveSidebar: boolean;
  isAssigneeModalOpen: boolean;
  isCreateTaskModal: boolean;
  isBlockingTasksModalOpen: boolean;
  isStatusModalOpen: boolean;
  timeline: string;
  ownerFilter: string;
}

const initialState: diffState = {
  isActiveSidebar: false,
  isAssigneeModalOpen: false,
  isCreateTaskModal: false,
  isBlockingTasksModalOpen: false,
  isStatusModalOpen: false,
  timeline: "day",
  ownerFilter: "none",
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
    toggleTimeline: (state, action) => {
      return { ...state, timeline: action.payload };
    },
    toggleOwner: (state, action) => {
      return { ...state, ownerFilter: action.payload };
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
  toggleTimeline,
  toggleOwner,
} = diffSlice.actions;

export default diffSlice.reducer;
