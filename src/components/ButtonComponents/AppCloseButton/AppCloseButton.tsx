import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { FaCloseButton } from "../../icons/icons";

export const AppCloseButton: FC = () => {
  const navigate = useNavigate();
  const isEmptyState = useAppSelector(
    (state: RootState) => state.project.isEmptyState
  );
  const handleClick = () => {
    if (isEmptyState) {
      navigate("/empty_state");
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
