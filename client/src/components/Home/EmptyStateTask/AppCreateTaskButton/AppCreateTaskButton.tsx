import { FC } from "react";
import { FaButtonPlus } from "../../../icons/icons";
import { useAppDispatch } from "../../../../redux/hooks";
import { toggleIsCreateTaskModal } from "../../../../redux/diffSlice/diffSlice";


export const AppCreateTaskButton: FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(toggleIsCreateTaskModal(true));
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
