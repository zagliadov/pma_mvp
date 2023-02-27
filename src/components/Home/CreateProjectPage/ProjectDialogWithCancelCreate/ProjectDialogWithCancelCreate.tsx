import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import {
  toggleIsEmptyStateProject,
  addProject,
} from "../../../../redux/projectSlice/projectSlice";
import { RootState } from "../../../../redux/store";

interface IProps {
  projectName: string;
  members: string[];
  projectDescription: string;
  tasks: string[];
}

export const ProjectDialogWithCancelCreate: FC<IProps> = ({
  projectName,
  members,
  projectDescription,
  tasks,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEmptyStateProject = useAppSelector(
    (state: RootState) => state.project.isEmptyStateProject
  );

  const handleCancel = () => {
    if (isEmptyStateProject) {
      navigate("/empty_state_project");
    } else {
      navigate("/");
    }
  };

  const handleCreateProject = () => {
    if (members.length && projectName && projectDescription) {
      dispatch(
        addProject({ projectName, projectDescription, projectMembers: members })
      );
      dispatch(toggleIsEmptyStateProject(false));
      navigate("/empty_state_task");
    }
  };

  return (
    <>
      <button
        onClick={handleCancel}
        className="py-2.5 px-6 text-base font-medium"
      >
        Cancel
      </button>
      <button
        onClick={handleCreateProject}
        className="bg-primary-500 rounded py-2.5 px-6 text-white text-base font-medium"
      >
        Create project
      </button>
    </>
  );
};
