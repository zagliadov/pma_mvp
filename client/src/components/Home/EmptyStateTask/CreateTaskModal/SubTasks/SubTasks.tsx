import { FC, useState, useEffect, useRef } from "react";
import { SubTasksList } from "./SubTasksList/SubTasksList";
import { AddSubTasks } from "./AddSubTasks/AddSubTasks";

interface IProps {
  setSubTasks: Function;
  subTasks: string[];
}

export const SubTasks: FC<IProps> = ({ setSubTasks, subTasks }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [subTask, setSubTask] = useState<string>("");
  const inputAddTaskRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputAddTaskRef.current) inputAddTaskRef.current.value = "";
  }, [isEdit, isAddingTask]);

  return (
    <div className="border-t border-b pt-4 pb-8 px-8">
      <p className="text-gray-600 text-xs pb-4">Subtasks</p>

      <SubTasksList
        setSubTasks={setSubTasks}
        subTasks={subTasks}
        setSubTask={setSubTask}
        subTask={subTask}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setIsAddingTask={setIsAddingTask}
      />

      <div className="flex items-center h-8">
        <AddSubTasks
          setSubTask={setSubTask}
          subTask={subTask}
          isAddingTask={isAddingTask}
          setIsAddingTask={setIsAddingTask}
          setIsEdit={setIsEdit}
          setSubTasks={setSubTasks}
          subTasks={subTasks}
          inputAddTaskRef={inputAddTaskRef}
        />
      </div>
    </div>
  );
};
