import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import {
  FaAddOwner,
  FaArrowDown,
  FaCalendar,
  FaPlusCircle,
  FaPriorityFlag,
} from "../../../icons/icons";
import { useParams } from "react-router-dom";
import { getTasks } from "../../../../redux/tasksSlice/tasksSlice";
import { TasksList } from "./TasksList/TasksList";

export const Table: FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { isCreateTaskModal } = useAppSelector(
    (state: RootState) => state.diff
  );

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
          <span className="font-medium text-gray-600 pl-6 text-xs">Task name</span>
        </div>
        <div className="flex justify-start items-center desktop:basis-1/12 basis-2/12">
          <span className="font-medium text-gray-600 text-xs">Task owner</span>
        </div>
        <div className="flex justify-start items-center desktop:basis-1/12 basis-2/12">
          <span className="font-medium text-gray-600 text-xs">Goal start</span>
        </div>
        <div className="flex items-center justify-start desktop:basis-1/12 basis-2/12">
          <span className="font-medium text-gray-600 text-xs pr-2">Goal end</span>
          <FaArrowDown />
        </div>
        <div className="flex items-center justify-start desktop:basis-1/12 basis-2/12">
          <span className="font-medium text-gray-600 text-xs">Task time</span>
        </div>
        <div className="flex items-center justify-start desktop:basis-1/12 basis-2/12">
          <span className="font-medium text-gray-600 text-xs">Priority</span>
        </div>
        <div className="flex items-center justify-start desktop:basis-1/12 basis-2/12">
          <span className="font-medium text-gray-600 text-xs">Effort</span>
        </div>
        <div className="flex items-center justify-center desktop:basis-1/12 basis-2/12">
          <FaPlusCircle />
        </div>
      </div>
      <div className="flex min-w-full border-b border-x py-2">
        <div className="desktop:basis-9/12 basis-6/12">
          <span className="font-normal pl-6 text-sm">New task name</span>
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
    </div>
  );
};
