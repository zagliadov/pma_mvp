import { FC, useState } from "react";
import {
  FaCloseButton,
  FaColorCheck,
  FaPlusSpace,
} from "../../../../icons/icons";
import { hexToRgba } from "../../../../../helpers/helpers";

interface IStatusArray {
  color: string;
  status: string;
}
interface IProps {
  setCreateStatusModalOpen: Function;
  setStatusModalOpen: Function;
  statusArray: IStatusArray[];
  setStatus: Function;
  setColor: Function;
  color: string | null;
}
export const StatusModal: FC<IProps> = ({
  setStatusModalOpen,
  setCreateStatusModalOpen,
  statusArray,
  setStatus,
  setColor,
  color,
}) => {
  const [isStatusSelected, setIsStatusSelected] = useState<number | null>(null);
  const handleCloseStatusModal = () => {
    setStatusModalOpen(false);
    setCreateStatusModalOpen(false);
  };
  const handleOpenCreateStatusModal = () => {
    setCreateStatusModalOpen(true);
  };
  const handleEditStatus = (status: string, color: string, index: number) => {
    setCreateStatusModalOpen(true);
  };

  const handleSaveStatus = (index: number, status: string, color: string) => {
    setIsStatusSelected(index);
    setStatus(status);
    setColor(color);
  };

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

        <div className="flex flex-col px-4">
          {statusArray &&
            statusArray.map((status: IStatusArray, index: number) => {
              return (
                <div key={index} className="flex items-center py-2">
                  <button
                    onClick={() =>
                      handleSaveStatus(index, status.status, status.color)
                    }
                    className={`h-5 w-5 ${
                      isStatusSelected === index || color === status.color
                        ? "bg-primary-500"
                        : "bg-gray-100"
                    } rounded flex items-center justify-center`}
                  >
                    {(isStatusSelected === index || color === status.color) && (
                      <FaColorCheck />
                    )}
                  </button>

                  <div className="w-full pl-2">
                    <div
                      className="rounded"
                      style={{
                        backgroundColor: hexToRgba(status.color, 0.16),
                      }}
                    >
                      <div className="flex items-center justify-between py-1 px-3">
                        <div className="flex items-center">
                          <div
                            style={{ backgroundColor: status.color }}
                            className="h-3 w-3 rounded-sm"
                          ></div>
                          <span className="pl-2">{status.status}</span>
                        </div>

                        {/* <button
                          className="p-1"
                          onClick={() =>
                            handleEditStatus(status.status, status.color, index)
                          }
                        >
                          <FaEditButton />
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
