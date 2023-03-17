import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  toggleIsAssigneeModalOpen,
  toggleIsBlockingTasksModalOpen,
  toggleIsStatusModalOpen,
} from "../../../../../redux/diffSlice/diffSlice";
import { RootState } from "../../../../../redux/store";

export const BlockingTaskButton: FC = () => {
  const isBlockingTasksModalOpen = useAppSelector(
    (state: RootState) => state.diff.isBlockingTasksModalOpen
  );
  const dispatch = useAppDispatch();
  const handleModalOpen = () => {
    dispatch(toggleIsBlockingTasksModalOpen(!isBlockingTasksModalOpen));
    dispatch(toggleIsStatusModalOpen(false));
    dispatch(toggleIsAssigneeModalOpen(false));
  };
  return (
    <button
      className="flex items-center border border-gray-100 rounded px-4 py-1.5"
      onClick={handleModalOpen}
    >
      <span className="pl-1.5 font-medium font-sm text-gray-600">Link</span>
    </button>
  );
};
