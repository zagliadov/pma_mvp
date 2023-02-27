import { FC } from "react";

interface IProps {
  isOpen: boolean;
}
export const AppNotificationDropdown: FC<IProps> = ({ isOpen }) => {
  return (
    <div
      className={`absolute flex-col top-16 bg-white right-2 border rounded-lg w-[640px] h-[300px] ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div>dropdown</div>
    </div>
  );
};
