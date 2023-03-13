import { FC, useMemo, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaCloseButton,
  FaGroupColor,
} from "../../../../icons/icons";
import { ColorsList } from "./ColorsList/ColorsList";
import { useAppSelector, useAppDispatch } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import {
  IStatusArray,
  updateStatus,
} from "../../../../../redux/statusSlice/statusSlice";

interface IProps {
  editId: number | null;
  statusColor: string;
  setStatusColor: Function;
  setCreateEditStatusModalOpen: Function;
  setColor: Function;
  setStatus: Function;
}
export const EditStatusModal: FC<IProps> = ({
  editId,
  setColor,
  setStatus,
  statusColor,
  setStatusColor,
  setCreateEditStatusModalOpen,
}) => {
  const [colorIsNotListed, setColorIsNotListed] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [colorNumber, setColorNumber] = useState<number>(0);
  const token: string | null = localStorage.getItem("token");
  const colorInputRef = useRef<any>(null);
  const statuses = useAppSelector((state: RootState) => state.status.statuses);
  const status: IStatusArray[] = useMemo(
    () => statuses.filter((status: any) => status.id === editId),
    [editId, statuses]
  );
  const [newStatus, setNewStatus] = useState<string>(status[0].status);
  const isActiveColor = (index: number) =>
    colorNumber === index && !colorIsNotListed;

  const handleSelectColor = (color: string, index: number) => {
    setColorNumber(index);
    setStatusColor(color);
    setColorIsNotListed(false);
  };

  const handleCloseEditStatusModal = () => {
    setCreateEditStatusModalOpen(false);
  };
  const handleOpenColorInput = () => {
    colorInputRef.current.click();
  };
  const handleUpdateStatus = () => {
    if (!token) return;
    if (!editId) return;
    if (newStatus !== "") {
      setStatus(newStatus);
      setColor(statusColor);
      dispatch(
        updateStatus({
          color: statusColor,
          status: newStatus,
          token,
          id: editId,
        })
      );
      setCreateEditStatusModalOpen(false);
    }
  };

  return (
    <div className="absolute z-[111] flex flex-col justify-between bg-white shadow-md top-[60px] left-[480px] w-[320px] h-[480px] border">
      <div>
        <div className="flex items-center justify-between py-2 border-b">
          <button onClick={() => handleCloseEditStatusModal()} className="pl-4">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-medium">Update status</span>
          <button onClick={() => handleCloseEditStatusModal()} className="pr-2">
            <FaCloseButton />
          </button>
        </div>
        <div className="flex items-center pt-4 justify-center">
          <input
            onChange={(e) => setNewStatus(e.target.value)}
            type="text"
            value={newStatus}
            className="py-2 px-2 border rounded"
            placeholder="Input status..."
          />
        </div>
        <div className="px-4 py-4">
          <span>Select color</span>
          <div className="flex justify-between">
            <ColorsList
              isActiveColor={isActiveColor}
              handleSelectColor={handleSelectColor}
            />

            <button onClick={() => handleOpenColorInput()} className="relative">
              <FaGroupColor />
              <input
                type="color"
                ref={colorInputRef}
                onChange={() => setStatusColor(colorInputRef.current.value)}
                className="hidden"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="py-2 px-4 border-t">
        <button
          onClick={() => handleUpdateStatus()}
          className="bg-primary-500 py-1.5 w-full text-white font-medium rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};
