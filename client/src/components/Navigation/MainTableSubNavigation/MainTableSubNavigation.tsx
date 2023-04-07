import { FC } from "react";
import { FaButtonPlus, FaEye, FaFilter, FaUsers } from "../../icons/icons";
import { UsersListButton } from "./UsersListButton/UsersListButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import {
  toggleIsCreateTaskModal,
  toggleOwner,
  toggleTimeline,
} from "../../../redux/diffSlice/diffSlice";
import { useLocation } from "react-router-dom";

export const MainTableSubNavigation: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const timelinePathname: boolean =
    location.pathname.split("/")[1] === "timeline";
  const toggleIsActiveSidebar = useAppSelector(
    (state: RootState) => state.diff.isActiveSidebar
  );
  const { timeline, ownerFilter } = useAppSelector(
    (state: RootState) => state.diff
  );
  const shutdownEffect = toggleIsActiveSidebar;
  const handleCreateTaskModalOpen = () => {
    dispatch(toggleIsCreateTaskModal(true));
  };

  const handleChangeTimeline = (time: string) => {
    dispatch(toggleTimeline(time));
  };

  const handleChangeOwner = (owner: string) => {
    dispatch(toggleOwner(owner));
  };

  return (
    <div
      className={`py-2 px-4 flex items-center justify-between ${
        shutdownEffect ? "blur-[2px] border-gray-300" : "bg-white"
      }`}
    >
      <div className="flex">
        <button
          className="flex items-center rounded bg-primary-500 py-2 px-4"
          onClick={handleCreateTaskModalOpen}
        >
          <FaButtonPlus />
          <span className="font-medium font-sm text-white pl-1">Task</span>
        </button>

        <div className="flex items-center pl-8">
          <UsersListButton />

          <div className="flex pl-4">
            <button className="flex items-center min-w-[110px]">
              <FaEye />
              <span className="font-medium font-sm text-gray-600 pl-1 pr-4 border-r-[2px]">
                Show me
              </span>
            </button>

            <button className="flex items-center pl-4 min-w-[110px]">
              <FaFilter />
              <span className="font-medium font-sm text-gray-600 pl-1 pr-4 border-r-[2px]">
                Filter
              </span>
            </button>

            {timelinePathname && (
              <div className="flex justify-between bg-gray-50 px-1 py-1 w-[164px] rounded">
                <button
                  onClick={() => handleChangeTimeline("day")}
                  className={`${
                    timeline === "day" && "bg-white text-primary-500"
                  } px-1 py-1 rounded text-sm text-gray-400 font-medium`}
                >
                  Day
                </button>
                <button
                  onClick={() => handleChangeTimeline("week")}
                  className={`${
                    timeline === "week" && "bg-white text-primary-500"
                  } px-1 py-1 rounded text-sm text-gray-400 font-medium`}
                >
                  Week
                </button>
                <button
                  onClick={() => handleChangeTimeline("month")}
                  className={`${
                    timeline === "month" && "bg-white text-primary-500"
                  } px-1 py-1 rounded text-sm text-gray-400 font-medium`}
                >
                  Month
                </button>
              </div>
            )}
          </div>
          {timelinePathname && (
            <div className="pl-4 pr-4">
              <div className="border h-6"></div>
            </div>
          )}

          {timelinePathname && (
            <div className="flex justify-between bg-gray-50 px-1 py-1 w-[251px] rounded">
              <button
                onClick={() => handleChangeOwner("none")}
                className={`${
                  ownerFilter === "none" && "bg-white text-primary-500"
                } px-1 py-1 rounded text-sm text-gray-400 font-medium`}
              >
                None
              </button>
              <button
                onClick={() => handleChangeOwner("team owner")}
                className={`${
                  ownerFilter === "team owner" && "bg-white text-primary-500"
                } px-1 py-1 rounded text-sm text-gray-400 font-medium`}
              >
                Team owner
              </button>
              <button
                onClick={() => handleChangeOwner("task owner")}
                className={`${
                  ownerFilter === "task owner" && "bg-white text-primary-500"
                } px-1 py-1 rounded text-sm text-gray-400 font-medium`}
              >
                Task owner
              </button>
            </div>
          )}
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
