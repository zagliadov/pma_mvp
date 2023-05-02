import { FC, useEffect, useRef, useState } from "react";
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
import React from "react";
import { TaskEndDate } from "./TaskEndDate/TaskEndDate";
import { TaskStartDate } from "./TaskStartDate/TaskStartDate";
import { toggleIsViewTaskOpen } from "../../../../../redux/diffSlice/diffSlice";

export const TasksList: FC = () => {
  const [isOpenSubtasks, setIsOpenSubtasks] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const [openMore, setOpenMore] = useState<number | null>(null);
  const existingArray: TaskPriority[] =
    JSON.parse(localStorage.getItem("task:priority") as string) || [];
  const [priorityArray, setPriorityArray] =
    useState<TaskPriority[]>(existingArray);
  const [isOpen, setIsOpen] = useState<boolean[]>(
    Array(tasks?.length ?? 0).fill(false)
  );
  const [isSelectedTask, setIsSelectedTask] = useState<boolean[]>(
    Array(tasks?.length ?? 0).fill(false)
  );
  const [isVisibleMoreMenu, setIsVisibleMoreMenu] = useState<boolean[]>(
    Array(tasks?.length ?? 0).fill(false)
  );

  useEffect(() => {
    setIsOpen(Array(tasks?.length ?? 0).fill(false));
  }, [tasks?.length]);

  // const [arrChoiceTask, setArrChoiceTask] = useState<number[]>([]);
  // const [choiceTask, setChoiceTask] = useState<number | null>(null);

  useEffect(() => {
    const everyFalse = isSelectedTask.every((element) => element === false);
    if (everyFalse) {
      localStorage.removeItem("task:id");
      dispatch(toggleIsViewTaskOpen(false));
    }
  }, [dispatch, isSelectedTask]);

  const handleSelectedTask = (id: number, index: number) => {
    localStorage.setItem("task:id", String(id));
    setIsSelectedTask((prevState: boolean[]) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      newState.forEach((_, i) => {
        if (i !== index) {
          newState[i] = false;
        }
      });
      return newState;
    });
    // setChoiceTask(id);
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

  const handleMouseEnter = (id: number, index: number) => {
    setIsVisibleMoreMenu((prevState: boolean[]) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      newState.forEach((_, i: number) => {
        if (i !== index) {
          newState[i] = false;
        }
      });
      return newState;
    });
  };

  const handleMouseLeave = () => {
    setIsVisibleMoreMenu(Array(tasks?.length ?? 0).fill(false));
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
              days_between,
              start_date,
              end_date,
            }: ITask,
            index: number
          ) => {
            return (
              <React.Fragment key={id}>
                <tr
                  onMouseEnter={() => handleMouseEnter(id, index)}
                  onMouseLeave={() => handleMouseLeave()}
                  className={`border hover:bg-gray-50 ${
                    isSelectedTask[index] && "bg-primary-100"
                  }`}
                >
                  <td className={`w-1/2 min-w-[500px] py-2 pr-4 `}>
                    <div className="flex items-center">
                      <div className="pl-1">
                        <label
                          htmlFor={"task" + String(id)}
                          className="cursor-pointer"
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center ${
                              isVisibleMoreMenu[index] && "bg-gray-300"
                            } ${isSelectedTask[index] && "bg-primary-500"}`}
                          >
                            {isSelectedTask[index] && <FaCheckbox />}
                          </div>
                        </label>
                        <input
                          id={"task" + String(id)}
                          className="hidden"
                          type="checkbox"
                          onChange={() => handleSelectedTask(id, index)}
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
                  </td>
                  <td className="min-w-[120px]">
                    <AssigneeList assignee={assignee} taskId={id} />
                  </td>
                  <td className="min-w-[60px] relative">
                    <TaskStartDate
                      start_date={start_date}
                      index={index}
                      taskId={id}
                    />
                  </td>
                  <td className="min-w-[70px] relative">
                    <TaskEndDate
                      end_date={end_date}
                      index={index}
                      taskId={id}
                    />
                  </td>
                  <td className="min-w-[60px]">
                    {days_between > 1 && (
                      <span className="text-gray-600 text-xs font-normal">
                        {days_between} days
                      </span>
                    )}
                    {days_between === 1 && (
                      <span className="text-gray-600 text-xs font-normal">
                        {days_between} day
                      </span>
                    )}
                  </td>
                  <td className="min-w-[50px]">
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
                  </td>
                  <td className="min-w-[50px]"></td>
                  <td className="min-w-[40px]">
                    <div className="relative flex items-center">
                      {(isSelectedTask[index] || isVisibleMoreMenu[index]) && (
                        <button
                          onClick={() => handleOpenMore(id)}
                          className="px-4 py-2"
                        >
                          <FaMoreVertical />
                        </button>
                      )}
                      {openMore === id && <TaskMoreMenu />}
                    </div>
                  </td>
                </tr>
                <>{isOpen[index] && <SubtasksList />}</>
              </React.Fragment>
            );
          }
        )}
    </>
  );
};
