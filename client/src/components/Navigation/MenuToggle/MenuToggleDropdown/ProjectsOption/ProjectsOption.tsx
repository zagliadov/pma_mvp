import { FC, useEffect, useState, useRef } from "react";
import { IProjects } from "../../../../../redux/projectSlice/projectSlice";
import { useClickOutside } from "../../../../../hooks/useClickOutside";
import {
  FaChevronRight,
  FaMembers,
  FaMoreVertical,
  FaNoActiveTable,
  FaNoActiveTimeline,
  FaProjectListSettings,
  FaProjectsListView,
} from "../../../../icons/icons";

interface IProps {
  projects: IProjects[];
  isOpen: boolean;
  parentMenuIsOpen: boolean;
}
export const ProjectsOption: FC<IProps> = ({
  projects,
  isOpen,
  parentMenuIsOpen,
}) => {
  const [isViewHover, setIsViewHover] = useState<boolean>(false);
  const [isViewSubmenuOpen, setIsViewSubmenuOpen] = useState<boolean>(false);
  const moreMenuRef = useRef(null);
  const [isVisible, setIsVisible] = useState<boolean[]>(
    Array(projects.length).fill(false)
  );
  const [moreMenuIsOpen, setMoreMenuIsOpen] = useState<boolean[]>(
    Array(projects.length).fill(false)
  );
  useClickOutside(moreMenuRef, () =>
    setMoreMenuIsOpen(Array(projects.length).fill(false))
  );

  useEffect(() => {
    if (!parentMenuIsOpen) {
      setIsVisible(Array(projects.length).fill(false));
      setMoreMenuIsOpen(Array(projects.length).fill(false));
    }
  }, [parentMenuIsOpen, projects.length]);

  const handleVisible = (id: number, index: number) => {
    setIsVisible((prevState: boolean[]) => {
      const newState = [...prevState];
      if (newState[index]) return newState;
      newState[index] = !newState[index];
      newState.forEach((item, i) => {
        if (i !== index) {
          newState[i] = false;
        }
      });
      return newState;
    });
    if (!isVisible[index] && moreMenuIsOpen[index]) {
      setMoreMenuIsOpen(Array(projects.length).fill(false));
    }
  };

  const handleOpenMoreMenu = (project_id: number, index: number) => {
    setMoreMenuIsOpen((prevState: boolean[]) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      newState.forEach((item, i) => {
        if (i !== index) {
          newState[i] = false;
        }
      });
      return newState;
    });
  };

  const handleOpenViewSubmenu = () => {
    setIsViewSubmenuOpen(!isViewSubmenuOpen);
  };

  return (
    <div className="pl-5">
      {projects &&
        isOpen &&
        projects.map((project: IProjects, index: number) => {
          return (
            <div
              key={project.id}
              onMouseEnter={() => handleVisible(project.id, index)}
              className="flex items-center pt-3"
            >
              <div className="flex w-8 h-8 bg-gray-50 rounded">
                <span className="flex items-center justify-center uppercase text-sm w-full h-full">
                  {project.name.charAt(0)}
                </span>
              </div>
              <div className="pl-2 w-full flex justify-between">
                <span className="text-sm font-medium">{project.name}</span>
                {isVisible[index] && (
                  <button
                    className="px-4"
                    onClick={() => handleOpenMoreMenu(project.id, index)}
                  >
                    <FaMoreVertical />
                  </button>
                )}
              </div>
              {moreMenuIsOpen[index] && isVisible[index] && (
                <div
                  ref={moreMenuRef}
                  className="relative"
                  onMouseEnter={() => handleVisible(project.id, index)}
                >
                  <div className="absolute w-[200px] flex flex-col right-[-208px] px-1 py-1 top-[-20px] justify-around bg-white rounded-lg">
                    <button className="flex items-center hover:bg-gray-50 px-2 py-2 rounded">
                      <FaProjectListSettings />
                      <span className="pl-2">Settings</span>
                    </button>
                    <button className="flex items-center hover:bg-gray-50 px-2 py-2 rounded">
                      <FaMembers />
                      <span className="pl-2">Members</span>
                    </button>
                    <button
                      onClick={() => handleOpenViewSubmenu()}
                      onMouseEnter={() => setIsViewHover(true)}
                      onMouseLeave={() => setIsViewHover(false)}
                      className="flex items-center justify-between hover:bg-gray-50 px-2 py-2 rounded"
                    >
                      <div className="flex items-center">
                        <FaProjectsListView />
                        <span className="pl-2">View</span>
                      </div>
                      {isViewHover && (
                        <div className="flex items-center">
                          <FaChevronRight />
                        </div>
                      )}
                    </button>
                  </div>

                  {isViewSubmenuOpen && (
                    <div
                      className="relative"
                      onMouseLeave={() => setIsViewSubmenuOpen(false)}
                    >
                      <div className="absolute bg-white right-[-415px] w-[200px] top-[60px] px-1 py-1 rounded-lg justify-around">
                        <div className="flex flex-col">
                          <button className="flex items-center hover:bg-gray-50 px-2 py-2 rounded">
                            <FaNoActiveTable />
                            <span className="pl-2">Main Table</span>
                          </button>
                          <button className="flex items-center hover:bg-gray-50 px-2 py-2 rounded">
                            <FaNoActiveTimeline />
                            <span className="pl-2">Timeline</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};
