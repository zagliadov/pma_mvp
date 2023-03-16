import { FC } from "react";
import { FaButtonPlus, FaEye, FaFilter, FaUsers } from "../../icons/icons";
import { UsersListButton } from "./UsersListButton/UsersListButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { toggleIsCreateTaskModal } from "../../../redux/diffSlice/diffSlice";

export const MainTableSubNavigation: FC = () => {
  const dispatch = useAppDispatch();
  const toggleIsActiveSidebar = useAppSelector(
    (state: RootState) => state.diff.isActiveSidebar
  );
  const shutdownEffect = toggleIsActiveSidebar;
  const handleCreateTaskModalOpen = () => {
    dispatch(toggleIsCreateTaskModal(true));
  }
  return (
    <div className={`py-2 px-4 flex items-center justify-between ${
      shutdownEffect ? "bg-gray-150 border-gray-300" : "bg-white"
    }`}>
      <div className="flex">
        <button className="flex items-center rounded bg-primary-500 py-2 px-4" onClick={handleCreateTaskModalOpen}>
          <FaButtonPlus />
          <span className="font-medium font-sm text-white pl-1">Task</span>
        </button>

        <div className="flex items-center pl-8">
          <UsersListButton />

          <div className="flex pl-4">
            <button className="flex items-center">
              <FaEye />
              <span className="font-medium font-sm text-gray-600 pl-1 pr-4 border-r-[2px]">
                Show me
              </span>
            </button>

            <button className="flex items-center pl-4">
              <FaFilter />
              <span className="font-medium font-sm text-gray-600 pl-1 pr-4 border-r-[2px]">
                Filter
              </span>
            </button>

            {/* {isTimelineRoute &&
              <div>
                <button>Day</button>
                <button>Week</button>
                <button>Month</button>
              </div>
            } */}
          </div>
        </div>
      </div>

      <div>
        <button className="flex items-center bg-primary-50 px-4 py-2 rounded">
          <FaUsers />
          <span className="font-medium font-sm text-primary-600 pl-1">
            Share
          </span>
        </button>
      </div>
    </div>
  );
};
