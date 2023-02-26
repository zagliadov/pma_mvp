import { FC, useState, useEffect, useRef } from "react";
import { ProjectTasksList } from "./ProjectTasksList/ProjectTasksList";
import { ProjectAddTask } from "./ProjectAddTask/ProjectAddTask";

interface IProps {
  setTasks: Function;
  tasks: string[];
}

export const ProjectTasks: FC<IProps> = ({ setTasks, tasks }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const inputAddTaskRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputAddTaskRef.current) inputAddTaskRef.current.value = "";
  }, [isEdit, isAddingTask]);

  return (
    <div className="border-t pt-2 pb-8">
      <p className="text-gray-600 text-xs pb-4 pt-4">Tasks</p>

      <ProjectTasksList
        setTasks={setTasks}
        tasks={tasks}
        setTask={setTask}
        task={task}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setIsAddingTask={setIsAddingTask}
      />

      <div className="flex items-center h-8">
        <ProjectAddTask
          setTask={setTask}
          task={task}
          isAddingTask={isAddingTask}
          setIsAddingTask={setIsAddingTask}
          setIsEdit={setIsEdit}
          setTasks={setTasks}
          tasks={tasks}
          inputAddTaskRef={inputAddTaskRef}
        />
      </div>
    </div>
  );
};
