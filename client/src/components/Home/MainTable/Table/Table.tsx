import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import {
  FaAddOwner,
  FaArrowDown,
  FaCalendar,
  FaChevronRight,
  FaPlusCircle,
  FaPriorityFlag,
} from "../../../icons/icons";
import { useParams } from "react-router-dom";
import { getTasks } from "../../../../redux/tasksSlice/tasksSlice";
import { AssigneeList } from "./AssigneeList/AssigneeList";
import { TasksList } from "./TasksList/TasksList";
import { SubtasksList } from "./SubtasksList/SubtasksList";

export const Table: FC = () => {
  const params = useParams();
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();
  const color: string = localStorage.getItem("priority") as string;
  const { isCreateTaskModal } = useAppSelector(
    (state: RootState) => state.diff
  );
  const [priority, setPriority] = useState<string[]>([
    "",
    "#ED7668",
    "#7EC770",
  ]);

  const handleChangePriority = () => {
    setPriority((prevPriority: string[]) => {
      const newPriority: string[] = [...prevPriority];
      const firstColor: string | undefined = newPriority.shift();
      if (firstColor !== undefined) {
        newPriority.push(firstColor);
      }
      localStorage.setItem("priority", newPriority[0]);
      return newPriority;
    });
  };
  useEffect(() => {
    const token: string | null = localStorage && localStorage.getItem("token");
    if (!token) return;
    const projectId = Number(params.project_id);
    dispatch(getTasks({ project_id: projectId, token }));
  }, [isCreateTaskModal, params.project_id, dispatch]);

  return (
    <div className="flex flex-col py-4 px-4">
      <div className="flex min-w-full border py-2">
        <div className="desktop:basis-9/12 basis-6/12">
          <span className="font-medium text-gray-600 pl-6">Task name</span>
        </div>
        <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12">
          <span className="font-medium text-gray-600">Task owner</span>
        </div>
        <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12">
          <span className="font-medium text-gray-600">Goal start</span>
        </div>
        <div className="flex items-center justify-center desktop:basis-1/12 basis-2/12">
          <span className="font-medium text-gray-600">Goal end</span>
          <FaArrowDown />
        </div>
        <div className="flex items-center justify-center desktop:basis-1/12 basis-2/12">
          <span className="font-medium text-gray-600">Task time</span>
        </div>
        <div className="flex items-center justify-center desktop:basis-1/12 basis-2/12">
          <span className="font-medium text-gray-600">Priority</span>
        </div>
        <div className="flex items-center justify-center desktop:basis-1/12 basis-2/12">
          <span className="font-medium text-gray-600">Effort</span>
        </div>
        <div className="flex items-center justify-center desktop:basis-1/12 basis-2/12">
          <FaPlusCircle />
        </div>
      </div>
      <div className="flex min-w-full border-b border-x py-2">
        <div className="desktop:basis-9/12 basis-6/12">
          <span className="font-medium text-gray-600 pl-6">New task name</span>
        </div>
        <div className="desktop:basis-1/12 basis-2/12">
          <button className="flex items-center justify-center border rounded-full w-7 h-7">
            <FaAddOwner />
          </button>
        </div>
        <div className="desktop:basis-1/12 basis-2/12">
          <button className="flex items-center justify-center border rounded-full w-7 h-7">
            <FaCalendar />
          </button>
        </div>
        <div className="desktop:basis-1/12 basis-2/12">
          <button className="flex items-center justify-center border rounded-full w-7 h-7">
            <FaCalendar />
          </button>
        </div>
        <div className="desktop:basis-1/12 basis-2/12"></div>
        <div className="desktop:basis-1/12 basis-2/12">
          <button className="flex items-center justify-center w-7 h-7">
            <FaPriorityFlag fill={""} />
          </button>
        </div>
        <div className="desktop:basis-1/12 basis-2/12"></div>
        <div className="desktop:basis-1/12 basis-2/12"></div>
      </div>
      <div className="flex min-w-full flex-col">
        <TasksList />
      </div>
      {/* <div className="flex">
        <SubtasksList />
      </div> */}
      {/* <table className="min-w-full table-auto">
        <thead className="border text-left text-xs">
          <tr>
            <th className="font-medium text-gray-600 py-2 pl-6 w-2/4">
              Task name
            </th>
            <th className="font-medium text-gray-600">Task owner</th>
            <th className="font-medium text-gray-600">Goal start</th>
            <th className="font-medium text-gray-600">
              <div className="flex items-center">
                <span className="pr-2">Goal end</span>
                <FaArrowDown />
              </div>
            </th>
            <th className="font-medium text-gray-600">Task time</th>
            <th className="font-medium text-gray-600">Priority</th>
            <th className="font-medium text-gray-600">Effort</th>
          </tr>
          <tr>
            <th className="text-xs font-medium text-gray-600 py-2 pl-6 w-2/4">
              New task name
            </th>
            <th className="text-xs font-medium text-gray-600 py-2">
              <button className="flex items-center justify-center border rounded-full w-7 h-7">
                <FaAddOwner />
              </button>
            </th>
            <th className="text-xs font-medium text-gray-600 py-2">
              <button className="flex items-center justify-center border rounded-full w-7 h-7">
                <FaCalendar />
              </button>
            </th>
            <th className="text-xs font-medium text-gray-600 py-2">
              <button className="flex items-center justify-center border rounded-full w-7 h-7">
                <FaCalendar />
              </button>
            </th>
            <th className="text-xs font-medium text-gray-600 py-2"></th>
            <th className="text-xs font-medium text-gray-600 py-2">
              <button
                className="flex items-center justify-center"
                onClick={handleChangePriority}
              >
                <FaPriorityFlag fill={color} />
              </button>
            </th>
            <th className="text-xs font-medium text-gray-600 py-2"></th>
          </tr>
        </thead>
        <tbody className="border text-left text-xs">
          <TasksList />
        </tbody>
      </table> */}
    </div>
  );
};
