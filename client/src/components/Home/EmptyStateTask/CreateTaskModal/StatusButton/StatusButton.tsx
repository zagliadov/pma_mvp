import { FC } from "react";
import { FaTaskStatusIcon } from "../../../../icons/icons";
import { useAppDispatch } from "../../../../../redux/hooks";
import { toggleIsAssigneeModalOpen } from "../../../../../redux/diffSlice/diffSlice";

interface IProps {
  setStatusModalOpen: Function;
  setCreateStatusModalOpen: Function;
  setCreateEditStatusModalOpen: Function;
  statusModalOpen: boolean;
  status: string | null;
  color: string | null;
}

export const StatusButton: FC<IProps> = ({
  setStatusModalOpen,
  statusModalOpen,
  setCreateStatusModalOpen,
  setCreateEditStatusModalOpen,
  status,
  color
}) => {
  const dispatch = useAppDispatch();
  const handleChangeStatus = () => {
    setStatusModalOpen(!statusModalOpen);
    setCreateStatusModalOpen(false);
    setCreateEditStatusModalOpen(false);
    dispatch(toggleIsAssigneeModalOpen(false));
  };

  return (
    <div className="pr-4">
      <button
        onClick={() => handleChangeStatus()}
        className={`flex items-center border rounded px-4 py-1.5 
        ${statusModalOpen ? "border-primary-500" : "border-gray-100"}`}
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
