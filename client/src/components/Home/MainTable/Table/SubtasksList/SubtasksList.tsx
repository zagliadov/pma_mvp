import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
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

export const SubtasksList: FC = () => {
  const [openMore, setOpenMore] = useState<number | null>(null);
  const [visible, setVisible] = useState<number | null>(null);
  const subtasks: ISubtasks[] = useAppSelector(
    (state: RootState) => state.subtasks.subtasks
  );
  // const [arrChoiceTask, setArrChoiceTask] = useState<number[]>([]);
  const [choiceSubtask, setChoiceSubtask] = useState<number | null>(null);
  const existingArray: TaskPriority[] =
    JSON.parse(localStorage.getItem("subtask:priority") as string) || [];
  const [priorityArray, setPriorityArray] =
    useState<TaskPriority[]>(existingArray);

  const handleChoiceSubtaskTask = (id: number) => {
    setChoiceSubtask(id);
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
      {subtasks &&
        subtasks.map(({ id, color, name, assignee }: ISubtasks) => {
          return (
            <div key={id}>
              <div
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={() => handleMouseLeave()}
                className={`flex border-b border-x ${
                  choiceSubtask !== id && "hover:bg-gray-50"
                } ${choiceSubtask === id && "bg-primary-100"}`}
              >
                <div
                  className={`flex items-center desktop:basis-9/12 basis-6/12`}
                >
                  <div className="flex items-center py-2">
                    <div className="pl-1">
                      <label
                        htmlFor={"subtask" + String(id)}
                        className="cursor-pointer"
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            visible === id && "bg-gray-300"
                          } ${choiceSubtask === id && "bg-primary-500"}`}
                        >
                          {choiceSubtask === id && <FaCheckbox />}
                        </div>
                      </label>
                      <input
                        id={"subtask" + String(id)}
                        className="hidden"
                        type="checkbox"
                        onChange={() => handleChoiceSubtaskTask(id)}
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
                </div>
                <div className="flex justify-start items-center desktop:basis-1/12 basis-2/12">
                  <SubtaskAssigneeList assignee={assignee} />
                </div>
                <div className="flex justify-start items-center desktop:basis-1/12 basis-2/12 "></div>
                <div className="flex justify-start items-center desktop:basis-1/12 basis-2/12 "></div>
                <div className="flex justify-start items-center desktop:basis-1/12 basis-2/12 "></div>
                <div className="flex justify-start items-center desktop:basis-1/12 basis-2/12 ">
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
                </div>
                <div className="flex justify-start items-center desktop:basis-1/12 basis-2/12 "></div>
                <div className="relative flex justify-center items-center desktop:basis-1/12 basis-2/12 ">
                  {(choiceSubtask === id || visible === id) && (
                    <button
                      onClick={() => handleOpenMore(id)}
                      className="px-4 py-2"
                    >
                      <FaMoreVertical />
                    </button>
                  )}
                  {openMore === id && <SubtaskMoreMenu />}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
