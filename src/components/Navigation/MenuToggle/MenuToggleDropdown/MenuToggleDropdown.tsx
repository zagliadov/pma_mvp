import { FC } from "react";
import { FaCheckCircle, FaCloseMenu } from "../../../icons/icons";

interface IProps {
  isOpen: boolean;
  handleToggle: Function;
}
export const MenuToggleDropdown: FC<IProps> = ({ isOpen, handleToggle }) => {
  return (
    <div
      className={`absolute flex-col top-0 left-0 bg-white border border-gray-300 w-80 h-screen ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between px-4 pt-[7px] pb-[8px] border-b border-gray-300">
        <div className="flex items-center">
          <FaCheckCircle />
          <span className="text-sm font-bold pl-1 uppercase tracking-[0.08em]">
            saas-mvp
          </span>
        </div>
        <button onClick={() => handleToggle()} className="pl-4 flex">
          <FaCloseMenu />
        </button>
      </div>
    </div>
  );
};
