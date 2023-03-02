import { FC, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaPlusSpace,
} from "../../../../icons/icons";
import { useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import { IProjects } from "../../../../../redux/projectSlice/projectSlice";

export const MyFirstSpaceOption: FC = () => {
  const projects = useAppSelector((state: RootState) => state.project.projects);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      {projects &&
        projects.map((project: IProjects) => {
          return (
            <div className="pt-4" key={project.projectName}>
              <div className="flex items-center px-4">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center w-full"
                >
                  <div>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</div>
                  <div className="flex items-center">
                    <span className="pl-2 text-base font-normal">
                      {project.projectSpaceName}
                    </span>
                  </div>
                </button>
                <button>
                  <FaPlusSpace />
                </button>
              </div>

              {isOpen && (
                <div className="pl-10 pt-4">
                  <span>{project.projectName}</span>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};
