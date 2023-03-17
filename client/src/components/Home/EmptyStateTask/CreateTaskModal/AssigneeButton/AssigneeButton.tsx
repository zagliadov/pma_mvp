import { FC } from "react";
import { FaProfile } from "../../../../icons/icons";
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { RootState } from "../../../../../redux/store";
import { toggleIsAssigneeModalOpen, toggleIsBlockingTasksModalOpen } from "../../../../../redux/diffSlice/diffSlice";

export const AssigneeButton: FC = () => {
  const isAssigneeModalOpen = useAppSelector((state: RootState) => state.diff.isAssigneeModalOpen);
  const dispatch = useAppDispatch();

  const handleModalOpen = () => {
    dispatch(toggleIsAssigneeModalOpen(!isAssigneeModalOpen));
    dispatch(toggleIsBlockingTasksModalOpen(false));
  }

  return (
    <div className="pl-4">
      <button onClick={() => handleModalOpen()} className="flex items-center border border-gray-100 rounded px-4 py-1.5">
        <FaProfile />
        <span className="pl-1.5 font-medium font-sm text-gray-600">Assignee</span>
      </button>
    </div>
  )
}