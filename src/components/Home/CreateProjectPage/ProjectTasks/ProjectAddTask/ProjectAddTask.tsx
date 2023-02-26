import { FC, useState, useEffect, KeyboardEvent } from "react";
import { FaAddTask } from "../../../../icons/icons";
import { isItemExist } from "../../../../../helpers/helpers";

interface IProps {
  setTask: Function;
  task: string;
  isAddingTask: boolean;
  setIsAddingTask: Function;
  setIsEdit: Function;
  setTasks: Function;
  tasks: string[];
  inputAddTaskRef: any;
}

export const ProjectAddTask: FC<IProps> = ({
  setTask,
  task,
  isAddingTask,
  setIsAddingTask,
  setIsEdit,
  setTasks,
  tasks,
  inputAddTaskRef,
}) => {
  const [width, setWidth] = useState<number>(0);

  const handleAddTask = () => {
    setIsAddingTask(!isAddingTask);
    setIsEdit(false);
  };

  const handleOnKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (task.length === 0) return;
      if (isItemExist(task, tasks)) return;
      setTasks((prevArray: string[]) => [...prevArray, task]);
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
          Add task
        </span>
      </button>
      <div className="pl-3">
        <input
          ref={inputAddTaskRef}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => handleOnKeyDownAddTask(e)}
          style={{ width: `${width}px` }}
          placeholder="Press enter to add task..."
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
