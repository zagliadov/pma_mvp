import { FC, useEffect, useState } from "react";
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
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    const projectId = Number(params.project_id);
    dispatch(getTasks(projectId));
  }, [isCreateTaskModal, params.project_id, dispatch]);

  const handleAddCol = () => {
    setIsAdded(!isAdded);
  };

  return (
    <div className="relative overflow-x-auto bg-white h-full w-full">
      <table className="table-auto w-full border">
        <thead>
          <tr className="border">
            <th className="w-1/2 min-w-[500px] py-2 pr-4">
              <div className="flex items-center">
                <span className="font-medium text-gray-600 pl-6 text-xs">
                  Task name
                </span>
              </div>
            </th>
            <th className="min-w-[120px]">
              <div className="flex items-center">
                <span className="font-medium text-gray-600 text-xs">
                  Task owner
                </span>
              </div>
            </th>
            <th className="min-w-[60px]">
              <div className="flex items-center">
                <span className="font-medium text-gray-600 text-xs">
                  Goal start
                </span>
              </div>
            </th>
            <th className="min-w-[70px]">
              <button className="flex items-center">
                <span className="font-medium text-gray-600 text-xs pr-2">
                  Goal end
                </span>
                <FaArrowDown />
              </button>
            </th>
            <th className="min-w-[60px]">
              <div className="flex items-center">
                <span className="font-medium text-gray-600 text-xs">
                  Task time
                </span>
              </div>
            </th>
            <th className="min-w-[50px]">
              <div className="flex items-center">
                <span className="font-medium text-gray-600 text-xs">
                  Priority
                </span>
              </div>
            </th>
            <th className="min-w-[50px]">
              <div className="flex items-center">
                <span className="font-medium text-gray-600 text-xs">
                  Effort
                </span>
              </div>
            </th>
            <th className="min-w-[40px]">
              <div className="relative flex items-center pl-3">
                <button onClick={() => handleAddCol()}>
                  <FaPlusCircle />
                </button>
                {isAdded && (
                  <div className="absolute flex items-start w-[240px] h-[240px] rounded-lg shadow-lg z-[3] border bg-white right-2 top-10">
                    <button>Add column</button>
                  </div>
                )}
              </div>
            </th>
          </tr>
          <tr className="border">
            <th className="w-1/2 min-w-[500px] py-2 pr-4">
              <div className="flex items-center">
                <span className="font-normal pl-6 text-sm">New task name</span>
              </div>
            </th>
            <th className="min-w-[120px]">
              <div className="flex items-center">
                <button className="flex items-center justify-center border rounded-full w-7 h-7">
                  <FaAddOwner />
                </button>
              </div>
            </th>
            <th className="min-w-[60px]">
              <label
                htmlFor="goal_start"
                className="flex items-center justify-center cursor-pointer border rounded-full w-7 h-7"
              >
                <FaCalendar />{" "}
              </label>
            </th>
            <th className="min-w-[70px]">
              <label
                htmlFor="goal_start"
                className="flex items-center justify-center cursor-pointer border rounded-full w-7 h-7"
              >
                <FaCalendar />{" "}
              </label>
            </th>
            <th className="min-w-[60px]"></th>
            <th className="min-w-[50px]">
              <div className="flex items-center">
                <button className="flex items-center justify-center w-7 h-7">
                  <FaPriorityFlag fill={""} />
                </button>
              </div>
            </th>
            <th className="min-w-[50px]"></th>
            <th className="min-w-[50px]"></th>
          </tr>
        </thead>
        <tbody>
          <TasksList />
        </tbody>
      </table>
    </div>
  );
};
