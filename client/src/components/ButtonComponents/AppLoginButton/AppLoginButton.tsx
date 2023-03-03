import { FC, useEffect } from "react";
import { ILogInProps } from "../../../redux/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logIn } from "../../../redux/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

export const AppLoginButton: FC<ILogInProps> = ({ email, password }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEmptyStateProject = useAppSelector(
    (state: RootState) => state.project.isEmptyStateProject
  );
  const isEmptyStateTask = useAppSelector(
    (state: RootState) => state.project.isEmptyStateTask
  );
  const token = useAppSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token === "") return;
    if (isEmptyStateProject) navigate("/empty_state_project");
    if (!isEmptyStateProject) navigate("/main_table");
    if (!isEmptyStateProject && !isEmptyStateTask) navigate("/");
  }, [isEmptyStateProject, isEmptyStateTask, navigate, token]);

  const handleClick = () => {
    if (email === "" && password === "") return;
    dispatch(logIn({ email, password }));
  };
  return (
    <button
      onClick={handleClick}
      className="bg-primary-500 text-white font-medium text-base py-2.5 rounded"
    >
      Log in
    </button>
  );
};
