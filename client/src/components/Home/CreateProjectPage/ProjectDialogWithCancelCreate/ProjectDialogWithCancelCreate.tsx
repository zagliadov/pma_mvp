import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import {
  addNewProject,
} from "../../../../redux/projectSlice/projectSlice";
import { RootState } from "../../../../redux/store";
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
  const params = useParams();
  const dispatch = useAppDispatch();
  const token: string | null = localStorage && localStorage.getItem("token");
  const isEmptyStateProject = useAppSelector(
    (state: RootState) => state.project.isEmptyStateProject
  );

  const handleCancel = () => {
    if (isEmptyStateProject) {
      navigate(`/empty_state_project/${params.workspace_id}`);
    } else {
      navigate("/");
    }
  };

  const handleCreateProject = () => {
    if (!token) return;
    if (members.length && projectName && projectDescription) {
      dispatch(
        addNewProject({
          workspace_id: Number(params.workspace_id),
          token,
          name: projectName,
          members,
          description: projectDescription,
        })
      );
      navigate(`/main_table/${params.workspace_id}`);
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
