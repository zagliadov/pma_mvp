import { FC } from "react";

interface IProps {
  isOpen: boolean;
}
export const MenuToggleDropdown: FC<IProps> = ({ isOpen }) => {
  return (
    <div
      className={`absolute flex-col top-0 left-0 bg-white border border-gray-300 w-80 h-screen ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="border-b pt-[55px] w-80"></div>
    </div>
  );
};
