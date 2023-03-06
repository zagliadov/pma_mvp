import { FC, useEffect } from "react";
import { ILogInProps, isAuth } from "../../../redux/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logIn } from "../../../redux/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { getWorkspaces } from "../../../redux/workspacesSlice/workspacesSlice";

export const AppLoginButton: FC<ILogInProps> = ({ email, password }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEmptyStateProject = useAppSelector(
    (state: RootState) => state.workspaces.isEmptyStateProject
  );
  const isEmptyStateTask = useAppSelector(
    (state: RootState) => state.project.isEmptyStateTask
  );
  const token = useAppSelector((state: RootState) => state.auth.token);

 

  const handleClick = () => {
    if (email === "" && password === "") return;
    dispatch(logIn({ email, password }));
    dispatch(isAuth());
    navigate("/empty_state_project");
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
