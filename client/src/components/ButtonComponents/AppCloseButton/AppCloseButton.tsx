import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { FaCloseButton } from "../../icons/icons";

export const AppCloseButton: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEmptyStateProject = useAppSelector(
    (state: RootState) => state.project.isEmptyStateProject
  );
  const handleClick = () => {
    if (isEmptyStateProject) {
      navigate(`/empty_state_project/${params.workspace_id}`);
    } else {
      navigate("/");
    }
  };

  return (
    <button onClick={() => handleClick()}>
      <FaCloseButton />
    </button>
  );
};
