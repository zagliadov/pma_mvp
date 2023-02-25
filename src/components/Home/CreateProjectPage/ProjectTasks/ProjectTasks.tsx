import { FC, useState, useEffect, KeyboardEvent, useRef } from "react";
import { FaAddTask, FaEditButton, FaTrashButton } from "../../../icons/icons";
import { isItemExist } from "../../../../helpers/helpers";

export const ProjectTasks: FC = () => {
  const [editItem, setEditItem] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setWidth(isAddingTask ? 330 : 0);
    return () => {
      setWidth(0);
    };
  }, [isAddingTask]);

  const handleAddTask = () => {
    setIsAddingTask(!isAddingTask);
    setIsEdit(false);
  };

  const handleOnKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (task.length === 0) return;
      if (isItemExist(task, tasks)) return;
      setTasks((prevArray: string[]) => [...prevArray, task]);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleOnKeyDownEditTask = (
    e: KeyboardEvent<HTMLInputElement>,
    isEdit: string[]
  ) => {
    if (e.key === "Enter") {
      setTask(isEdit[0]);
      const index = tasks.findIndex((e: string) => e === isEdit[0]);
      if (isItemExist(task, tasks)) return;
      if (task.length === 0) return;
      setTasks((prevArray: string[]) => [
        ...prevArray.slice(0, index),
        task,
        ...prevArray.slice(index + 1),
      ]);
    }
  };

  const handleOpenEdit = (task: string) => {
    setIsAddingTask(false);
    setIsEdit(true);
    const a = tasks.filter((t: string) => {
      return t === task;
    });
    setEditItem(a);
  };

  const handleRemoveTask = (task: string) => {
    setTasks((prevArray: string[]) => {
      return prevArray.filter((item: string) => item !== task);
    });
  };

  return (
    <div className="border-t pt-2 pb-8">
      <p className="text-gray-600 text-xs pb-4 pt-4">Tasks</p>
      {tasks &&
        tasks.map((task: string) => {
          return (
            <div key={task} className="flex justify-between pb-4">
              <div className="flex items-center pl-1.5">
                <div className="rounded-full bg-gray-300 w-1.5 h-1.5"></div>
                <span className="pl-2 text-sm font-normal">{task}</span>
              </div>

              <div className="flex items-center pr-1.5 h-8">
                <div className="flex items-center">
                  {editItem[0] === task && isEdit ? (
                    <div className="flex flex-col mt-5 mr-2 ">
                      <input
                        ref={inputRef}
                        onFocus={() => setTask(editItem[0])}
                        onChange={(e) => setTask(e.target.value)}
                        onKeyDown={(e) => handleOnKeyDownEditTask(e, editItem)}
                        placeholder="Press enter to edit..."
                        type="text"
                        defaultValue={task}
                        className="focus:outline-none w-[330px] mr-2"
                      />
                      <label className="flex text-gray-300 text-xs justify-center">
                        Press enter to edit...
                      </label>
                    </div>
                  ) : null}
                  <button className="p-1" onClick={() => handleOpenEdit(task)}>
                    <FaEditButton />
                  </button>
                </div>

                <button
                  className="ml-4 pl-1 pt-1 pr-1 pb-1"
                  onClick={() => handleRemoveTask(task)}
                >
                  <FaTrashButton />
                </button>
              </div>
            </div>
          );
        })}

      <div className="flex items-center h-8">
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
            ref={inputRef}
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
      </div>
    </div>
  );
};
