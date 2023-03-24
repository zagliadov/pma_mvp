import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { addNewProject } from "../../../../redux/projectSlice/projectSlice";
import { RootState } from "../../../../redux/store";
interface IProps {
  projectName: string;
  members: string[];
  projectDescription: string;
}

interface IProjectData {
  workspace_id: number;
  token: string;
  name: string;
  members: string[];
  description: string;
}

export const ProjectDialogWithCancelCreate: FC<IProps> = ({
  projectName,
  members,
  projectDescription,
}) => {
  const navigate = useNavigate();
  const { workspace_id } = useParams();
  const dispatch = useAppDispatch();
  const token: string | null = localStorage?.getItem("token");
  const { isEmptyStateProject } = useAppSelector(
    (state: RootState) => state.project
  );

  const handleCancel = () => {
    isEmptyStateProject
      ? navigate(`/empty_state_project/${workspace_id}`)
      : navigate("/");
  };

  const handleCreateProject = () => {
    if (!token) return console.error("Token not found");
    if (!members?.length) return console.error("Members list is empty");
    if (![projectName, projectDescription, workspace_id].every(Boolean)) {
      return console.error("Not all fields are filled");
    }
    const projectData: IProjectData = {
      workspace_id: Number(workspace_id),
      token,
      name: projectName,
      members,
      description: projectDescription,
    };
    dispatch(addNewProject(projectData)).then((data) => {
      navigate(`/main_table/${data.payload}`);
    });
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
