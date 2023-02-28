import { FC, useState } from "react";
import {
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaCloseMenu,
  FaPlusSpace,
  FaYourSpace,
} from "../../../icons/icons";

interface IProps {
  isOpen: boolean;
  handleToggle: Function;
}
export const MenuToggleDropdown: FC<IProps> = ({ isOpen, handleToggle }) => {
  const [isDisclosed, setIsDisclosed] = useState<boolean>(false);
  return (
    <div
      className={`absolute flex-col top-0 left-0 bg-white border border-gray-300 w-80 h-screen ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between pl-4 pr-1 pt-[7px] pb-[8px] border-b border-gray-300">
        <div className="flex items-center">
          <FaCheckCircle />
          <span className="text-sm font-bold pl-1 uppercase tracking-[0.08em]">
            saas-mvp
          </span>
        </div>
        <button onClick={() => handleToggle()} className="flex">
          <FaCloseMenu />
        </button>
      </div>

      <div className="pt-4">
        <button
          onClick={() => setIsDisclosed(!isDisclosed)}
          className="flex items-center justify-between w-full px-4"
        >
          <div className="flex items-center">
            <FaYourSpace />
            <span className="pl-2 text-base font-normal">Your spaces</span>
          </div>
          <div>{isDisclosed ? <FaChevronUp /> : <FaChevronDown />}</div>
        </button>
        {isDisclosed && (
          <button className="flex items-center">
            <FaPlusSpace />
            <span className="pl-2 text-primary-500 font-medium text-sm">New space</span>
          </button>
        )}
      </div>
    </div>
  );
};
