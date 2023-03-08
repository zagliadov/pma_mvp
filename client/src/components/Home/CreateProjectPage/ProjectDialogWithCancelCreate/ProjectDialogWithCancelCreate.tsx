import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import {
  addNewProject,
} from "../../../../redux/projectSlice/projectSlice";
import { RootState } from "../../../../redux/store";
import { useLocation } from "react-router-dom";
interface IProps {
  projectName: string;
  members: string[];
  projectDescription: string;
}

export const ProjectDialogWithCancelCreate: FC<IProps> = ({
  projectName,
  members,
  projectDescription,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token: string | null = localStorage && localStorage.getItem("token");
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
    if (!token) return;
    if (members.length && projectName && projectDescription && location.state) {
      dispatch(
        addNewProject({
          workspace_id: Number(location.state),
          token,
          name: projectName,
          members,
          description: projectDescription,
        })
      );
      navigate("/main_table");
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
