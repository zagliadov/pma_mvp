import { FC } from "react";
import { FaDropFileIcon } from "../../../../icons/icons";

export const DropFiles: FC = () => {
  return (
    <div className="pt-4">
      <div className="border border-dashed flex items-center justify-center py-4">
        <FaDropFileIcon />
        <span className="pl-2 text-sm font-normal text-gray-400">
          Drop files to attach or
        </span>
        <button className="pl-1 text-sm font-medium text-primary-500">
          browse
        </button>
      </div>
    </div>
  );
};
