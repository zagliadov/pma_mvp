import { FC, useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaPlusAddProject,
} from "../../../../icons/icons";
import { IWorkspaces } from "../../../../../redux/workspacesSlice/workspacesSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { getProjects } from "../../../../../redux/projectSlice/projectSlice";
import { RootState } from "../../../../../redux/store";
import { ProjectsOption } from "../ProjectsOption/ProjectsOption";
import { useNavigate } from "react-router-dom";

export interface IProps {
  workspaces: IWorkspaces[];
  parentMenuIsOpen: boolean;
  setParentMenuIsOpen: Function;
}
export const WorkspacesOption: FC<IProps> = ({
  workspaces,
  parentMenuIsOpen,
  setParentMenuIsOpen,
}) => {
  const [isOpen, setIsOpen] = useState<boolean[]>(
    Array(workspaces.length).fill(false)
  );
  const projects = useAppSelector((state: RootState) => state.project.projects);
  const token: string | null = localStorage && localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(Array(workspaces.length).fill(false));
  }, [parentMenuIsOpen, workspaces.length]);

  const handleOpenWorkspace = async (id: number, index: number) => {
    if (!token) return;
    dispatch(getProjects({ workspaces_id: id, token })).then(() => {
      setIsOpen((prevState: boolean[]) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        newState.forEach((item, i) => {
          if (i !== index) {
            newState[i] = false;
          }
        });
        return newState;
      });
    });
  };

  const handleAddProject = (workspace_id: number) => {
    navigate("/create_project", { state: workspace_id });
    setParentMenuIsOpen(false);
  };

  return (
    <div>
      {workspaces &&
        workspaces.map((workspace: IWorkspaces, index: number) => {
          return (
            <div className="pt-4 pl-4" key={workspace.id}>
              <div className="flex justify-between">
                <button
                  className="flex items-center"
                  onClick={() => handleOpenWorkspace(workspace.id, index)}
                >
                  <div className="pr-2">
                    {isOpen[index] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  <span className="text-sm font-medium">{workspace.name}</span>
                </button>
                <button
                  onClick={() => handleAddProject(workspace.id)}
                  className="pr-4"
                >
                  <FaPlusAddProject />
                </button>
              </div>

              <ProjectsOption
                projects={projects}
                isOpen={isOpen[index]}
                parentMenuIsOpen={parentMenuIsOpen}
              />
            </div>
          );
        })}
    </div>
  );
};
