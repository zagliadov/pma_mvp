import { FC } from "react";
import {
  FaArchive,
  FaChevronRight,
  FaDelete,
  FaDuplicate,
  FaMerge,
  FaMoveTo,
  FaRename,
} from "../../../../../icons/icons";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { removeTask } from "../../../../../../redux/tasksSlice/tasksSlice";

interface IProps {
  taskId: number;
}
export const TaskMoreMenu: FC<IProps> = ({ taskId }) => {
  const dispatch = useAppDispatch();

  const handleRemoveTask = () => {
    if (taskId && typeof taskId === "number") {
      dispatch(removeTask(taskId));
    }
  };

  return (
    <div className="absolute w-[200px] z-[2] bg-white top-[30px] rounded-lg shadow-lg right-1 border">
      <div className="p-1">
        <button className="flex items-center w-full hover:bg-gray-50 p-2 rounded">
          <FaRename />
          <span className="pl-2 text-sm">Rename</span>
        </button>
        <button className="flex items-center justify-between w-full hover:bg-gray-50 p-2 rounded">
          <div className="flex items-center">
            <FaMoveTo />
            <span className="pl-2 text-sm">Move to</span>
          </div>
          <FaChevronRight />
        </button>
        <button className="flex items-center w-full hover:bg-gray-50 p-2 rounded">
          <FaDuplicate />
          <span className="pl-2 text-sm">Duplicate</span>
        </button>
        <button className="flex items-center w-full hover:bg-gray-50 p-2 rounded">
          <FaMerge />
          <span className="pl-2 text-sm">Merge</span>
        </button>
      </div>
      <div className="border-t p-1">
        <button className="flex items-center w-full hover:bg-gray-50 p-2 rounded">
          <FaArchive />
          <span className="pl-2 text-sm">Archive</span>
        </button>
        <button
          className="flex items-center w-full hover:bg-gray-50 p-2 rounded"
          onClick={handleRemoveTask}
        >
          <FaDelete />
          <span className="pl-2 text-sm text-red-800">Delete</span>
        </button>
      </div>
    </div>
  );
};
