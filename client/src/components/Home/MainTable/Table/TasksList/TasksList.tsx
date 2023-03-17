import { FC, useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import { FaChevronRight } from "../../../../icons/icons";
import { AssigneeList } from "../AssigneeList/AssigneeList";
import { getSubtask } from "../../../../../redux/subtasksSlice/subtasksSlice";
import { SubtasksList } from "../SubtasksList/SubtasksList";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

export const TasksList: FC = () => {
  const [isOpenSubtasks, setIsOpenSubtasks] = useState<boolean>(false);
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const [isOpen, setIsOpen] = useState<boolean[]>(
    Array(tasks?.length).fill(false)
  );
  const dispatch = useAppDispatch();
  const [arrChoiceTask, setArrChoiceTask] = useState<number[]>([]);
  const ref = useRef<any>(null);

  const handleChoiceTask = (id: number) => {
    setArrChoiceTask((prevState: number[]) => {
      const isDuplicate = prevState.some((ids: number) => ids === id);
      if (isDuplicate) {
        return prevState.filter((ids: number) => ids !== id);
      } else {
        const newState = [...prevState, id];
        return newState;
      }
    });
  };

  const handleOpenSubtasks = (taskId: number, index: number) => {
    const parent = document.getElementById(`${taskId}`);
    if (!parent) return;
    const subtasksListEl = document.createElement('div');
    subtasksListEl.textContent = "Component";
    parent?.parentNode?.insertBefore(subtasksListEl, parent.nextSibling); //<SubtasksList />

    setIsOpenSubtasks(!isOpenSubtasks);
    dispatch(getSubtask(taskId)).then(() => {
      setIsOpen((prevState: boolean[]) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        newState.forEach((item, i) => {
          if (i !== index) {
            newState[i] = false;
          }
        });
        return newState;
      });
    });
  };

  const isChoice = (id: number) => {
    return arrChoiceTask.includes(id);
  };

  return (
    <div>
      {tasks.map(
        (
          {
            id,
            name,
            color,
            assignee,
          }: {
            id: number;
            name: string;
            color: string;
            assignee: string;
          },
          index: number
        ) => {
          return (
            <div
              ref={ref}
              id={String(id)}
              key={id}
              className={`flex ${!isChoice(id) && "hover:bg-gray-50"} ${
                isChoice(id) && "bg-primary-100"
              } border-b border-x`}
            >
              <div className={`flex flex-col desktop:basis-9/12 basis-6/12`}>
                <div className="flex items-center py-2">
                  <div className="pl-1">
                    <input
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
                </div>
              </div>
              <div className="flex justify-start items-center desktop:basis-1/12 basis-2/12 border">
                <AssigneeList assignee={assignee} taskId={id} />
              </div>
              <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
              <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
              <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
              <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
              <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
              <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
            </div>
          );

          // return (
          //   <tr
          //     key={id}
          // className={`${!isChoice(id) && "hover:bg-gray-50"} ${
          //   isChoice(id) && "bg-primary-100"
          // }`}
          //   >
          //     <th className="pl-6 text-gray-600 font-normal border-t border-b py-3">
          //       <div className="flex flex-col">
          //         <div className="flex items-center">
          //           <input
          //             type="checkbox"
          //             className="absolute left-[22px]"
          //             onChange={() => handleChoiceTask(id)}
          //           />
          //           <div className="flex items-center pl-5">
          // <button onClick={() => handleOpenSubtasks(id, index)}>
          //   <div
          //     className={`${
          //       isOpen[index]
          //         ? "origin-center rotate-90 duration-200"
          //         : "duration-200"
          //     }`}
          //   >
          //     <FaChevronRight />
          //   </div>
          // </button>
          // <div
          //   className="w-2.5 h-2.5 border ml-2 rounded-sm"
          //   style={{ backgroundColor: color }}
          // ></div>
          //             <span className="pl-2">{name}</span>
          //           </div>
          //         </div>
          //           {isOpen[index] && <SubtasksList />}
          //       </div>
          //     </th>
          //     <th className="border-b">
          //       <AssigneeList assignee={assignee} taskId={id} />
          //     </th>
          //     <th></th>
          //     <th></th>
          //     <th></th>
          //     <th></th>
          //     <th></th>
          //   </tr>
          // );
        }
      )}
    </div>
  );
};
