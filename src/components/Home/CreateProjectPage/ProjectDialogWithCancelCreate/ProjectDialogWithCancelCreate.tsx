import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks";
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
  const isEmptyState = useAppSelector(
    (state: RootState) => state.project.isEmptyState
  );

  const handleCancel = () => {
    if (isEmptyState) {
      navigate("/empty_state");
    } else {
      navigate("/");
    }
  };

  const handleCreateProject = () => {
    if (members.length && tasks.length && projectName && projectDescription) {
      console.log(projectName, projectDescription, members, tasks);
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
        Create first task
      </button>
    </>
  );
};
