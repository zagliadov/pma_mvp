import { FC } from "react";
import { FaTaskStatusIcon } from "../../../../icons/icons";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { toggleIsAssigneeModalOpen, toggleIsBlockingTasksModalOpen, toggleIsStatusModalOpen } from "../../../../../redux/diffSlice/diffSlice";
import { RootState } from "../../../../../redux/store";

interface IProps {
  setCreateStatusModalOpen: Function;
  setCreateEditStatusModalOpen: Function;
  status: string | null;
  color: string | null;
}

export const StatusButton: FC<IProps> = ({
  setCreateStatusModalOpen,
  setCreateEditStatusModalOpen,
  status,
  color
}) => {
  const dispatch = useAppDispatch();
  const isStatusModalOpen = useAppSelector((state: RootState) => state.diff.isStatusModalOpen);
  const handleChangeStatus = () => {
    dispatch(toggleIsStatusModalOpen(!isStatusModalOpen))
    setCreateStatusModalOpen(false);
    setCreateEditStatusModalOpen(false);
    dispatch(toggleIsAssigneeModalOpen(false));
    dispatch(toggleIsBlockingTasksModalOpen(false));
  };

  return (
    <div className="pr-4">
      <button
        onClick={() => handleChangeStatus()}
        className={`flex items-center border rounded px-4 py-1.5 
        ${isStatusModalOpen ? "border-primary-500" : "border-gray-100"}`}
      >
        {color !== null ? (
          <div
            style={{ backgroundColor: color }}
            className="h-3 w-3 rounded-sm"
          ></div>
        ) : (
          <FaTaskStatusIcon />
        )}
        <span className="pl-1.5 font-medium font-sm text-gray-600">
          {(status !== null) ? status : "Status"}
        </span>
      </button>
    </div>
  );
};
