import { FC, useState, useEffect, KeyboardEvent } from "react";
import { isItemExist } from "../../../../../../helpers/helpers";
import { FaAddTask } from "../../../../../icons/icons";

interface IProps {
  setSubTask: Function;
  subTask: string;
  isAddingTask: boolean;
  setIsAddingTask: Function;
  setIsEdit: Function;
  setSubTasks: Function;
  subTasks: string[];
  inputAddTaskRef: any;
}

export const AddSubTasks: FC<IProps> = ({
  setSubTask,
  subTask,
  isAddingTask,
  setIsAddingTask,
  setIsEdit,
  setSubTasks,
  subTasks,
  inputAddTaskRef,
}) => {
  const [width, setWidth] = useState<number>(0);

  const handleAddTask = () => {
    setIsAddingTask(!isAddingTask);
    setIsEdit(false);
  };

  const handleOnKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (subTask.length === 0) return;
      if (isItemExist(subTask, subTasks)) return;
      setSubTasks((prevArray: string[]) => [...prevArray, subTask]);
      if (inputAddTaskRef.current) inputAddTaskRef.current.value = "";
    }
  };

  useEffect(() => {
    setWidth(isAddingTask ? 330 : 0);
    return () => {
      setWidth(0);
    };
  }, [isAddingTask]);

  return (
    <>
      <button
        onClick={() => handleAddTask()}
        className="flex items-center pl-1"
      >
        <FaAddTask />
        <span className="pl-1.5 text-gray-600 text-sm font-medium">
          Add subtask
        </span>
      </button>
      <div className="pl-3">
        <input
          ref={inputAddTaskRef}
          onChange={(e) => setSubTask(e.target.value)}
          onKeyDown={(e) => handleOnKeyDownAddTask(e)}
          style={{ width: `${width}px` }}
          placeholder="Press enter to add subtask..."
          type="text"
          maxLength={40}
          className={`transition-all duration-500 ease-in-out w-0 focus:outline-none ${
            isAddingTask && "px-2"
          }`}
        />
      </div>
    </>
  );
};
