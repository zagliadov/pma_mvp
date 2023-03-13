import { FC, useState, useEffect } from "react";
import { FaCloseButton, FaPlusSpace } from "../../../../icons/icons";
import { useAppDispatch } from "../../../../../redux/hooks";
import { getStatuses } from "../../../../../redux/statusSlice/statusSlice";
import { DefaultListOfStatuses } from "./DefaultListOfStatuses/DefaultListOfStatuses";

interface IProps {
  setCreateStatusModalOpen: Function;
  setCreateEditStatusModalOpen: Function;
  setStatusModalOpen: Function;
  createStatusModalOpen: boolean;
  createEditStatusModalOpen: boolean;
  setStatus: Function;
  setColor: Function;
  handleEditStatus: Function;
}
export const StatusModal: FC<IProps> = ({
  setStatusModalOpen,
  setCreateStatusModalOpen,
  createStatusModalOpen,
  createEditStatusModalOpen,
  setCreateEditStatusModalOpen,
  handleEditStatus,
  setStatus,
  setColor,
}) => {
  const [isStatusSelected, setIsStatusSelected] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const token: string | null = localStorage.getItem("token");
  const handleCloseStatusModal = () => {
    setStatusModalOpen(false);
    setCreateStatusModalOpen(false);
  };

  const handleOpenCreateStatusModal = () => {
    setCreateStatusModalOpen(true);
    setCreateEditStatusModalOpen(false);
  };



  const handleSaveStatus = (index: number, status: string, color: string) => {
    setIsStatusSelected(index);
    setStatus(status);
    setColor(color);
  };

  useEffect(() => {
    if (!token) return;
    dispatch(getStatuses({ token }));
  }, [dispatch, token, createStatusModalOpen, createEditStatusModalOpen]);

  return (
    <div className="absolute z-[111] flex flex-col justify-between bg-white shadow-md top-[60px] left-[140px] w-[320px] h-[480px] border">
      <div>
        <div className="flex items-center justify-between py-2 border-b">
          <span className="pl-4 text-lg font-medium">Status</span>
          <button onClick={() => handleCloseStatusModal()} className="pr-2">
            <FaCloseButton />
          </button>
        </div>

        <div className="flex items-center pt-4 px-4 justify-center">
          <input
            type="text"
            className="py-2 px-2 border rounded w-full"
            placeholder="Search status..."
          />
        </div>

        <div className="flex flex-col px-4 border-green-600 h-[309px] overflow-auto">
          <DefaultListOfStatuses
            handleEditStatus={handleEditStatus}
            handleSaveStatus={handleSaveStatus}
            isStatusSelected={isStatusSelected}
          />
        </div>
      </div>

      <div className="px-4 py-2 border-t">
        <button
          onClick={() => handleOpenCreateStatusModal()}
          className="flex items-center justify-center py-2 bg-primary-50 w-full rounded"
        >
          <FaPlusSpace />
          <span className="pl-2 font-medium text-sm text-primary-600">
            New status
          </span>
        </button>
      </div>
    </div>
  );
};
