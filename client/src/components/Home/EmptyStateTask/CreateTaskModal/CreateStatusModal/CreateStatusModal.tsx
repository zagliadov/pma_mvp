import { FC, useState, useRef, ChangeEvent } from "react";
import {
  FaArrowLeft,
  FaCloseButton,
  FaGroupColor,
} from "../../../../icons/icons";
import { ColorsList } from "./ColorsList/ColorsList";
import { useAppDispatch } from "../../../../../redux/hooks";
import {
  getStatuses,
  setStatus,
} from "../../../../../redux/statusSlice/statusSlice";

interface IProps {
  setCreateStatusModalOpen: Function;
  setStatusColor: Function;
  statusColor: string;
}
export const CreateStatusModal: FC<IProps> = ({
  setCreateStatusModalOpen,
  setStatusColor,
  statusColor,
}) => {
  const dispatch = useAppDispatch();
  const [colorNumber, setColorNumber] = useState<number>(0);
  const [newStatus, setNewStatus] = useState<string>("");
  const [colorIsNotListed, setColorIsNotListed] = useState<boolean>(false);
  const colorInputRef = useRef<any>(null);
  const token = localStorage.getItem("token");
  const isActiveColor = (index: number) =>
    colorNumber === index && !colorIsNotListed;
  const handleCloseCreateStatusModal = () => {
    setCreateStatusModalOpen(false);
  };
  const handleSelectColor = (color: string, index: number) => {
    setColorNumber(index);
    setStatusColor(color);
    setColorIsNotListed(false);
  };

  const handleOpenColorInput = () => {
    colorInputRef.current.click();
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusColor(e.target.value);
    setColorIsNotListed(true);
  };

  const handleSaveStatus = () => {
    if (!token) return;
    if (newStatus === "") return;
    dispatch(setStatus({ color: statusColor, status: newStatus, token }));
    dispatch(getStatuses({ token }));
    setCreateStatusModalOpen(false);
  };

  return (
    <div className="absolute z-[111] flex flex-col justify-between bg-white shadow-md top-[60px] left-[480px] w-[320px] h-[480px] border">
      <div>
        <div className="flex items-center justify-between py-2 border-b">
          <button
            onClick={() => handleCloseCreateStatusModal()}
            className="pl-4"
          >
            <FaArrowLeft />
          </button>
          <span className="text-lg font-medium">Create status</span>
          <button
            onClick={() => handleCloseCreateStatusModal()}
            className="pr-2"
          >
            <FaCloseButton />
          </button>
        </div>
        <div className="flex items-center pt-4 justify-center">
          <input
            onChange={(e) => setNewStatus(e.target.value)}
            type="text"

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
                onChange={(e) => handleColorChange(e)}
                ref={colorInputRef}
                className="hidden"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="py-2 px-4 border-t">
        <button
          onClick={() => handleSaveStatus()}
          className="bg-primary-500 py-1.5 w-full text-white font-medium rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};
