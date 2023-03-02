import { FC } from "react";
import {
  FaActiveTable,
  FaActiveTimeline,
  FaNoActiveTable,
  FaNoActiveTimeline,
} from "../../icons/icons";
import { Link, useLocation } from "react-router-dom";

export const MainTableNavigation: FC = () => {
  const { pathname } = useLocation();
  const mainTablePath = pathname === "/main_table";
  const timelinePath = pathname === "/timeline";
  return (
    <div className="desktop:flex hidden items-center w-[40%]">
      <div>
        <span className="text-lg pl-6 font-medium  pr-4">Project Name</span>
      </div>

      <Link to="/main_table">
        <div className="relative flex items-center border-l-[2px] border-gray-100 px-4">
          {mainTablePath ? <FaActiveTable /> : <FaNoActiveTable />}
          <span
            className={`text-sm font-medium pl-1 ${
              mainTablePath ? "text-primary-500" : "text-gray-600"
            }`}
          >
            Main Table
          </span>
          {mainTablePath && (
            <div className="absolute w-[93px] h-[3px] bg-primary-500 top-[35px] left-[16px] border rounded-tr rounded-tl border-primary-500"></div>
          )}
        </div>
      </Link>

      <Link to="/timeline">
        <div className="flex relative items-center border-l-[2px] border-gray-100 pl-4">
          {timelinePath ? <FaActiveTimeline /> : <FaNoActiveTimeline />}
          <span
            className={`text-sm font-medium pl-1 ${
              timelinePath ? "text-primary-500" : "text-gray-600"
            }`}
          >
            Timeline
          </span>
          {timelinePath && (
            <div className="absolute w-[77px] h-[3px] bg-primary-500 top-[35px] left-[16px] border rounded-tr rounded-tl border-primary-500"></div>
          )}
        </div>
      </Link>
    </div>
  );
};
