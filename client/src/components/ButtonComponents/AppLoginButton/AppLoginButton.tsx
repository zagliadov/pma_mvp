import { FC, useEffect } from "react";
import { ILogInProps, isAuth } from "../../../redux/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logIn } from "../../../redux/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { getWorkspaces } from "../../../redux/workspacesSlice/workspacesSlice";

interface IProps {
  email: string;
  password: string;
  status: number | null;
}
export const AppLoginButton: FC<IProps> = ({ email, password, status }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = useAppSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(isAuth());
      navigate("/empty_state_project");
    }
  }, [dispatch, navigate, token]);

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
