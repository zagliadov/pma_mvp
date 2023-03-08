import { FC } from "react";
import { FaTaskStatusIcon } from "../../../../icons/icons";

interface IProps {
  setStatusModalOpen: Function;
  setCreateStatusModalOpen: Function;
  statusModalOpen: boolean;
  status: string | null;
  color: string | null;
}

export const StatusButton: FC<IProps> = ({
  setStatusModalOpen,
  statusModalOpen,
  setCreateStatusModalOpen,
  status,
  color
}) => {
  const handleChangeStatus = () => {
    setStatusModalOpen(!statusModalOpen);
    setCreateStatusModalOpen(false);
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
