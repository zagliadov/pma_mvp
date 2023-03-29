import { FC, useState } from "react";
import {
  FaActiveTable,
  FaActiveTimeline,
  FaNoActiveTable,
  FaNoActiveTimeline,
} from "../../icons/icons";
import { useAppSelector } from "../../../redux/hooks";
import { Link, useLocation, useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";

export const MainTableNavigation: FC = () => {
  const [projectNamePopover, setProjectNamePopover] = useState<boolean>(false);
  const { pathname } = useLocation();
  const params = useParams();
  const mainTablePath = pathname === `/main_table/${params.project_id}`;
  const timelinePath = pathname === `/timeline/${params.project_id}`;
  const project = useAppSelector((state: RootState) => state.project.project);
  const projectName = project[0]
    ? project[0]?.name.length > 20
      ? project[0]?.name.substring(0, 20) + "..."
      : project[0]?.name
    : "Project name";
  return (
    <>
      <div className="min-w-[180px] relative">
        <span
          className="text-lg pl-6 font-medium pr-4 truncate"
          onMouseEnter={() => setProjectNamePopover(true)}
          onMouseOut={() => setProjectNamePopover(false)}
        >
          {projectName}
        </span>
        {(projectNamePopover && project[0]?.name.length > 20) && (
          <span className="absolute top-7 left-8 z-[12] text-[12px] p-[1px] rounded-sm text-white w-auto bg-primary-500">
            {project[0]?.name}
          </span>
        )}
      </div>

      <Link to={`/main_table/${params.project_id}`}>
        <div className="relative flex items-center border-l-[2px] border-gray-100 px-4">
          {mainTablePath ? <FaActiveTable /> : <FaNoActiveTable />}
          <span
            className={`text-sm font-medium pl-1 min-w-[80px] ${
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

      <Link to={`/timeline/${params.project_id}`}>
        <div className="flex relative items-center border-l-[2px] border-gray-100 pl-4">
          {timelinePath ? <FaActiveTimeline /> : <FaNoActiveTimeline />}
          <span
            className={`text-sm font-medium pl-1 pr-4 ${
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
    </>
  );
};
