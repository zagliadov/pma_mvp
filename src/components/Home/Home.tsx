import { FC, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export const Home: FC = () => {
  const navigate = useNavigate();
  const isEmptyState = useAppSelector(
    (state: RootState) => state.project.isEmptyState
  );
  useEffect(() => {
    if (isEmptyState) {
      navigate("/empty_state");
    }
  }, [isEmptyState, navigate]);

  return <>Projects</>;
};
