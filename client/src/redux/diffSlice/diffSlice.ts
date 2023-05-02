import { createSlice } from "@reduxjs/toolkit";

export interface diffState {
  isActiveSidebar: boolean;
  isAssigneeModalOpen: boolean;
  isCreateTaskModal: boolean;
  isBlockingTasksModalOpen: boolean;
  isStatusModalOpen: boolean;
  timeline: string;
  ownerFilter: string;
  isFilterSidebarOpen: boolean;
  isViewTaskOpen: boolean;
}

const initialState: diffState = {
  isActiveSidebar: false,
  isAssigneeModalOpen: false,
  isCreateTaskModal: false,
  isBlockingTasksModalOpen: false,
  isStatusModalOpen: false,
  timeline: "day",
  ownerFilter: "none",
  isFilterSidebarOpen: false,
  isViewTaskOpen: false,
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
    toggleIsFilterSidebarOpen: (state, action) => {
      return { ...state, isFilterSidebarOpen: action.payload };
    },
    toggleIsViewTaskOpen: (state, action) => {
      return { ...state, isViewTaskOpen: action.payload };
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
  toggleIsFilterSidebarOpen,
  toggleIsViewTaskOpen,
} = diffSlice.actions;

export default diffSlice.reducer;
