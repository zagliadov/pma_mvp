import { FC, useEffect } from "react";
import {
  FaArrowDown,
  FaChevronDown,
  FaCloseFilterSidebar,
  FaNoActiveTimeline,
  FaNoData,
  FaNoStatus,
  FaProfile,
  FaResetButton,
  FaTerm,
} from "../../../icons/icons";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import { toggleIsFilterSidebarOpen } from "../../../../redux/diffSlice/diffSlice";
import { useParams } from "react-router-dom";
import { getProjectMembers } from "../../../../redux/projectSlice/projectSlice";

export const FilterSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const { projectMembers } = useAppSelector(
    (state: RootState) => state.project
  );
  const params = useParams();
  const { isFilterSidebarOpen } = useAppSelector(
    (state: RootState) => state.diff
  );

  const handleCloseFilterSidebar = () => {
    dispatch(toggleIsFilterSidebarOpen(false));
  };

  useEffect(() => {
    const token: string | null = localStorage?.getItem("token");
    if (!token) return;
    dispatch(
      getProjectMembers({ project_id: Number(params.project_id), token })
    );
  }, [dispatch, params.project_id]);

  return (
    <div className="w-[320px] h-auto border-r absolute top-0 left-0 z-10 bg-white">
      {/* header */}
      <div className="flex justify-between py-3 pl-4 pr-5 border-b border-gray-50">
        <div>
          <span className="text-lg">Filter</span>
        </div>
        <div className="flex">
          <button className="flex items-center bg-negative-50 rounded px-4">
            <FaResetButton />
            <span className="pl-[6px]">Reset</span>
          </button>

          <button className="pl-5" onClick={() => handleCloseFilterSidebar()}>
            <FaCloseFilterSidebar />
          </button>
        </div>
      </div>
      {/* keyword */}
      <div className="px-4 py-4">
        <div>
          <span className="text-sm">Keyword</span>
        </div>
        <div className="pt-2">
          <input
            className="border border-gray-100 rounded px-4 py-3"
            type="text"
            placeholder="Enter keyword"
          />
        </div>
        <span className="text-xs text-gray-600">
          Search for tasks, subtask etc...
        </span>
      </div>
      {/* participants */}
      <div className="px-4 py-4 border-b border-gray-50">
        <div className="pb-2">
          <span className="text-sm font-medium">Participants</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded flex items-center justify-center bg-gray-300`}
            ></div>
            <div className="pl-2">
              <div className="flex items-center justify-center bg-gray-200 w-6 h-6 rounded-full">
                <FaProfile />
              </div>
            </div>
            <div className="pl-2">
              <span className="text-sm text-gray-600">No participants</span>
            </div>
          </div>
          {projectMembers &&
            projectMembers.map((participants: any) => {
              return (
                <div className="flex items-center pt-2">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center bg-gray-300`}
                  ></div>
                  <div className="pl-2">
                    <div className="flex items-center justify-center bg-gray-200 w-6 h-6 rounded-full">
                      {participants?.avatar_filename ? null : (
                        <span className="text-sm text-gray-600">
                          {participants.email.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="pl-2">
                    <span className="text-sm text-gray-600">
                      {participants?.firstname
                        ? participants?.firstname
                        : "Test name"}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* End date */}
      <div className="px-4 py-4 border-b border-gray-50">
        <div>
          <span className="text-sm font-medium">End date</span>
        </div>
        <div className="flex items-center pt-2">
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded flex items-center justify-center bg-gray-300`}
            ></div>
            <div className="pl-2">
              <div className="flex items-center justify-center bg-gray-200 w-6 h-6 rounded-full">
                <FaNoData />
              </div>
            </div>
            <div className="pl-2">
              <span className="text-sm text-gray-600">No dates</span>
            </div>a
          </div>
        </div>
        <div className="flex items-center pt-2">
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded flex items-center justify-center bg-gray-300`}
            ></div>
            <div className="pl-2">
              <div className="flex items-center justify-center bg-red-850 w-6 h-6 rounded-full">
                <FaTerm />
              </div>
            </div>
            <div className="pl-2">
              <span className="text-sm text-gray-600">Term has expired</span>
            </div>
          </div>
        </div>
        <div className="flex items-center pt-2">
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded flex items-center justify-center bg-gray-300`}
            ></div>
            <div className="pl-2">
              <div className="flex items-center justify-center bg-orange-800 w-6 h-6 rounded-full">
                <FaTerm />
              </div>
            </div>
            <div className="pl-2">
              <span className="text-sm text-gray-600">
                Deadline is tomorrow
              </span>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="flex items-center pl-8">
            <FaChevronDown />
            <div className="pl-2">
              <span className="text-sm text-gray-600">Show more</span>
            </div>
          </div>
        </div>
      </div>
      {/* status */}
      <div className="px-4 py-4 border-b border-gray-50">
        <div>
          <span className="text-sm font-medium">Status</span>
        </div>
        <div className="flex items-center pt-2">
          <div
            className={`w-4 h-4 rounded flex items-center justify-center bg-gray-300`}
          ></div>
          <div className="pl-2">
            <div className="flex items-center justify-center bg-gray-300 w-6 h-6 rounded-full">
              <FaNoStatus />
            </div>
          </div>
          <div className="pl-2">
            <span className="text-sm text-gray-600">No status</span>
          </div>
        </div>
        <div className="flex items-center pt-2">
          
          <div
            className={`w-4 h-4 rounded flex items-center justify-center bg-gray-300`}
          ></div>
          <div className="pl-3">
            <div className="flex items-center justify-center bg-green-800 w-4 h-4 rounded-full"></div>
          </div>
          <div className="pl-3">
            <span>Ready</span>
          </div>
        </div>
        <div className="flex items-center pt-2">.

          <div
            className={`w-4 h-4 rounded flex items-center justify-center bg-gray-300`}
          ></div>
          <div className="pl-3">
            <div className="flex items-center justify-center bg-red-850 w-4 h-4 rounded-full"></div>
          </div>
          <div className="pl-3">
            <span>In work</span>
          </div>
        </div>
        <div className="flex items-center pt-2">
          <div
            className={`w-4 h-4 rounded flex items-center justify-center bg-gray-300`}
          ></div>
          <div className="pl-3">
            <div className="flex items-center justify-center bg-orange-800 w-4 h-4 rounded-full"></div>
          </div>
          <div className="pl-3">
            <span>Start to work</span>
          </div>
        </div>
        <div className="pt-4">
          <div className="flex items-center pl-8">
            <FaChevronDown />
            <div className="pl-2">
              <span className="text-sm text-gray-600">Show more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
