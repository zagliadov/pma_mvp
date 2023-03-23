import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import { SubtaskAssigneeList } from "./SubtaskAssigneeList/SubtaskAssigneeList";
import {
  FaAlignLeft,
  FaCheckbox,
  FaGitMerge,
  FaMoreVertical,
  FaPriorityFlag,
  FaTaskPaperclip,
} from "../../../../icons/icons";
import { ISubtasks, TaskPriority } from "../../../../../helpers/interface";
import { updatePriorityArray } from "../../../../../helpers/helpers";
import { SubtaskMoreMenu } from "./SubtaskMoreMenu/SubtaskMoreMenu";
import { SubtaskStartDate } from "./SubtaskStartDate/SubtaskStartDate";
import { SubtaskEndDate } from "./SubtaskEndDate/SubtaskEndDate";

export const SubtasksList: FC = () => {
  const [openMore, setOpenMore] = useState<number | null>(null);
  // const [visible, setVisible] = useState<number | null>(null);
  const subtasks: ISubtasks[] = useAppSelector(
    (state: RootState) => state.subtasks.subtasks
  );
  const existingArray: TaskPriority[] =
    JSON.parse(localStorage.getItem("subtask:priority") as string) || [];
  const [priorityArray, setPriorityArray] =
    useState<TaskPriority[]>(existingArray);
  const [isSelectedSubtask, setIsSelectedSubtask] = useState<boolean[]>(
    Array(subtasks?.length ?? 0).fill(false)
  );
  const [isVisibleMoreMenu, setIsVisibleMoreMenu] = useState<boolean[]>(
    Array(subtasks?.length ?? 0).fill(false)
  );

  const handleSelectedSubtask = (id: number, index: number) => {
    setIsSelectedSubtask((prevState: boolean[]) => {
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

  const handleChangePriority = (id: number) => {
    const updatedArray = priorityArray.map((priority: TaskPriority) => {
      if (id === priority.id) {
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
    localStorage.setItem("subtask:priority", JSON.stringify(updatedArray));
    setPriorityArray(updatedArray);
  };

  useEffect(() => {
    updatePriorityArray(subtasks, setPriorityArray, "subtask:priority");
  }, [subtasks]);

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
    setIsVisibleMoreMenu(Array(subtasks?.length ?? 0).fill(false));
    setOpenMore(null);
  };

  const handleOpenMore = (id: number) => {
    setOpenMore(id);
    if (openMore === id) setOpenMore(null);
  };

  return (
    <>
      {subtasks &&
        subtasks.map(
          (
            {
              id,
              color,
              name,
              assignee,
              days_between,
              start_date,
              end_date,
            }: ISubtasks,
            index: number
          ) => {
            return (
              <tr
                onMouseEnter={() => handleMouseEnter(id, index)}
                onMouseLeave={() => handleMouseLeave()}
                className={`border hover:bg-gray-50 ${
                  isSelectedSubtask[index] && "bg-primary-100"
                }`}
                key={id}
              >
                <td className={`w-1/2 min-w-[500px] py-2 pr-4 `}>
                  <div className="flex items-center">
                    <div className="pl-1">
                      <label
                        htmlFor={"subtask" + String(id)}
                        className="cursor-pointer"
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            isVisibleMoreMenu[index] && "bg-gray-300"
                          } ${isSelectedSubtask[index] && "bg-primary-500"}`}
                        >
                          {isSelectedSubtask[index] && <FaCheckbox />}
                        </div>
                      </label>
                      <input
                        id={"subtask" + String(id)}
                        className="hidden"
                        type="checkbox"
                        onChange={() => handleSelectedSubtask(id, index)}
                      />
                    </div>
                    <div className="pl-8"></div>
                    <div className="pl-7">
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
                      <button className="flex items-center mt-0.5 p-1 border rounded">
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
                  <SubtaskAssigneeList assignee={assignee} />
                </td>
                <td className="min-w-[60px] relative">
                  <SubtaskStartDate
                    start_date={start_date}
                    index={index}
                    subtaskId={id}
                  />
                </td>
                <td className="min-w-[70px] relative">
                  <SubtaskEndDate
                    end_date={end_date}
                    index={index}
                    subtaskId={id}
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
                    {existingArray.map((item: TaskPriority, index: number) => {
                      return (
                        <div key={index}>
                          {id === item.id && (
                            <FaPriorityFlag fill={`${item.priority}`} />
                          )}
                        </div>
                      );
                    })}
                  </button>
                </td>
                <td className="min-w-[50px]"></td>
                <td className="min-w-[40px]">
                  <div className="relative flex items-center">
                    {(isSelectedSubtask[index] || isVisibleMoreMenu[index]) && (
                      <button
                        onClick={() => handleOpenMore(id)}
                        className="px-4 py-2"
                      >
                        <FaMoreVertical />
                      </button>
                    )}
                    {openMore === id && <SubtaskMoreMenu />}
                  </div>
                </td>
              </tr>
            );
          }
        )}
    </>
  );
};
