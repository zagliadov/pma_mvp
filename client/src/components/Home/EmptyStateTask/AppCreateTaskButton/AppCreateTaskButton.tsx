import { FC } from "react";
import { FaButtonPlus } from "../../../icons/icons";

interface IProps {
  setIsModalOpen: Function;
}
export const AppCreateTaskButton: FC<IProps> = ({ setIsModalOpen }) => {
  const handleClick = () => {
    setIsModalOpen(true);
  };
  return (
    <button
      onClick={() => handleClick()}
      className="flex justify-center items-center px-7 bg-primary-500 text-white font-medium text-base py-2.5 rounded"
    >
      <FaButtonPlus />
      <span className="pl-2.5">Create Task</span>
    </button>
  );
};
