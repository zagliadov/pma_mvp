import { FC, useState, KeyboardEvent } from "react";
import { isItemExist } from "../../../../../../helpers/helpers";
import { FaEditButton, FaTrashButton } from "../../../../../icons/icons";

interface IProps {
  setSubTasks: Function;
  subTasks: string[];
  setSubTask: Function;
  subTask: string;
  isEdit: boolean;
  setIsEdit: Function;
  setIsAddingTask: Function;
}

export const SubTasksList: FC<IProps> = ({
  setSubTasks,
  subTasks,
  setSubTask,
  subTask,
  isEdit,
  setIsEdit,
  setIsAddingTask,
}) => {
  const [editItem, setEditItem] = useState<string[]>([]);

  const handleOnKeyDownEditTask = (
    e: KeyboardEvent<HTMLInputElement>,
    isEdit: string[]
  ) => {
    if (e.key === "Enter") {
      setSubTask(isEdit[0]);
      const index = subTasks.findIndex((e: string) => e === isEdit[0]);
      if (isItemExist(subTask, subTasks)) return;
      if (subTask.length === 0) return;
      setSubTasks((prevArray: string[]) => [
        ...prevArray.slice(0, index),
        subTask,
        ...prevArray.slice(index + 1),
      ]);
    }
  };

  const handleOpenEdit = (task: string) => {
    setIsAddingTask(false);
    setIsEdit(true);
    const a = subTasks.filter((t: string) => {
      return t === task;
    });
    setEditItem(a);
  };

  const handleRemoveTask = (task: string) => {
    setSubTasks((prevArray: string[]) => {
      return prevArray.filter((item: string) => item !== task);
    });
  };

  return (
    <>
      {subTasks &&
        subTasks.map((task: string) => {
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
                        onFocus={() => setSubTask(editItem[0])}
                        onChange={(e) => setSubTask(e.target.value)}
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
    </>
  );
};
