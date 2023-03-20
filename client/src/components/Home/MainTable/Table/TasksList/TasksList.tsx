import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import {
  FaAlignLeft,
  FaCheckbox,
  FaChevronRight,
  FaGitMerge,
  FaMoreVertical,
  FaPriorityFlag,
  FaTaskCheckCircle,
  FaTaskPaperclip,
} from "../../../../icons/icons";
import { AssigneeList } from "../AssigneeList/AssigneeList";
import { getSubtask } from "../../../../../redux/subtasksSlice/subtasksSlice";
import { SubtasksList } from "../SubtasksList/SubtasksList";
import { ITask, TaskPriority } from "../../../../../helpers/interface";
import { updatePriorityArray } from "../../../../../helpers/helpers";
import { TaskMoreMenu } from "./TaskMoreMenu/TaskMoreMenu";

export const TasksList: FC = () => {
  const [visible, setVisible] = useState<number | null>(null);
  const [isOpenSubtasks, setIsOpenSubtasks] = useState<boolean>(false);
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const [openMore, setOpenMore] = useState<number | null>(null);
  const existingArray: TaskPriority[] =
    JSON.parse(localStorage.getItem("task:priority") as string) || [];
  const [priorityArray, setPriorityArray] =
    useState<TaskPriority[]>(existingArray);
  const [isOpen, setIsOpen] = useState<boolean[]>(
    Array(tasks?.length).fill(false)
  );

  useEffect(() => {
    setIsOpen(Array(tasks?.length).fill(false));
  }, [tasks?.length]);

  const dispatch = useAppDispatch();
  // const [arrChoiceTask, setArrChoiceTask] = useState<number[]>([]);
  const [choiceTask, setChoiceTask] = useState<number | null>(null);

  const handleChoiceTask = (id: number) => {
    setChoiceTask(id);
    // setArrChoiceTask((prevState: number[]) => {
    //   const isDuplicate = prevState.some((ids: number) => ids === id);
    //   if (isDuplicate) {
    //     return prevState.filter((ids: number) => ids !== id);
    //   } else {
    //     const newState = [...prevState, id];
    //     return newState;
    //   }
    // });
  };

  const handleOpenSubtasks = (taskId: number, index: number) => {
    setIsOpenSubtasks(!isOpenSubtasks);
    dispatch(getSubtask(taskId)).then(() => {
      setIsOpen((prevState: boolean[]) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        newState.forEach((_, i) => {
          if (i !== index) {
            newState[i] = false;
          }
        });
        return newState;
      });
    });
  };

  useEffect(() => {
    updatePriorityArray(tasks, setPriorityArray, "task:priority");
  }, [tasks]);

  const handleChangePriority = (taskId: number) => {
    const updatedArray = priorityArray.map((priority: TaskPriority) => {
      if (taskId === priority.id) {
        switch (priority.priority) {
          case "":
            return { ...priority, priority: "#ED7668" };
          case "#ED7668":
            return { ...priority, priority: "#7EC770" };
          default:
            return { ...priority, priority: "" };
        }
      }
      return priority;
    });
    localStorage.setItem("task:priority", JSON.stringify(updatedArray));
    setPriorityArray(updatedArray);
  };

  const handleMouseEnter = (id: number) => {
    setVisible(id);
  };

  const handleMouseLeave = () => {
    setVisible(null);
    setOpenMore(null);
  };

  const handleOpenMore = (id: number) => {
    setOpenMore(id);
    if (openMore === id) setOpenMore(null);
  };

  return (
    <>
      {tasks &&
        tasks.map(
          (
            {
              id,
              name,
              color,
              assignee,
              completed_subtasks,
              total_subtasks,
            }: ITask,
            index: number
          ) => {
            return (
              <div key={id}>
                <div
                  onMouseEnter={() => handleMouseEnter(id)}
                  onMouseLeave={() => handleMouseLeave()}
                  className={`flex ${choiceTask !== id && "hover:bg-gray-50"} ${
                    choiceTask === id && "bg-primary-100"
                  } border-b border-x`}
                >
                  <div
                    className={`flex flex-col desktop:basis-9/12 basis-6/12`}
                  >
                    <div className="flex items-center py-2">
                      <div className="pl-1">
                        <label
                          htmlFor={"task" + String(id)}
                          className="cursor-pointer"
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center ${
                              visible === id && "bg-gray-300"
                            } ${choiceTask === id && "bg-primary-500"}`}
                          >
                            {choiceTask === id && <FaCheckbox />}
                          </div>
                        </label>
                        <input
                          id={"task" + String(id)}
                          className="hidden"
                          type="checkbox"
                          onChange={() => handleChoiceTask(id)}
                        />
                      </div>
                      <div className="pl-8">
                        <button onClick={() => handleOpenSubtasks(id, index)}>
                          <div
                            className={`${
                              isOpen[index]
                                ? "origin-center rotate-90 duration-200"
                                : "duration-200"
                            }`}
                          >
                            <FaChevronRight />
                          </div>
                        </button>
                      </div>
                      <div className="pl-2">
                        <div
                          className="w-2.5 h-2.5 rounded-sm mt-0.5"
                          style={{ backgroundColor: color }}
                        ></div>
                      </div>
                      <div className="pl-1.5">
                        <span className="font-normal text-sm">{name}</span>
                      </div>
                      <div className="flex items-center pl-2">
                        <button className="flex items-center mt-0.5 p-1 border rounded">
                          <FaGitMerge />
                        </button>
                      </div>
                      <div className="flex items-center pl-2">
                        <button className="flex items-center mt-0.5 p-1">
                          <FaTaskCheckCircle />
                          <span className="text-xs font-normal text-gray-400 pl-1">
                            {completed_subtasks}/{total_subtasks}
                          </span>
                        </button>
                      </div>
                      <div className="flex items-center pl-2">
                        <button className="flex items-center mt-0.5 p-0.5 border rounded">
                          <FaTaskPaperclip />
                        </button>
                      </div>
                      <div className="flex items-center pl-2">
                        <button className="flex items-center mt-0.5 p-1 border rounded">
                          <FaAlignLeft />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start items-center desktop:basis-1/12 basis-2/12">
                    <AssigneeList assignee={assignee} taskId={id} />
                  </div>
                  <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12"></div>
                  <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12"></div>
                  <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12"></div>
                  <div className="flex justify-start items-center desktop:basis-1/12 basis-2/12">
                    <button
                      className="flex items-center justify-center w-7 h-7"
                      onClick={() => handleChangePriority(id)}
                    >
                      {existingArray.map((p: TaskPriority, index: number) => {
                        return (
                          <div key={index}>
                            {id === p.id && (
                              <FaPriorityFlag fill={`${p.priority}`} />
                            )}
                          </div>
                        );
                      })}
                    </button>
                  </div>
                  <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12"></div>
                  <div className="relative flex justify-center items-center desktop:basis-1/12 basis-2/12">
                    {(choiceTask === id || visible === id) && (
                      <button
                        onClick={() => handleOpenMore(id)}
                        className="px-4 py-2"
                      >
                        <FaMoreVertical />
                      </button>
                    )}
                    {openMore === id && <TaskMoreMenu />}
                  </div>
                </div>
                {isOpen[index] && <SubtasksList />}
              </div>
            );
          }
        )}
    </>
  );
};
