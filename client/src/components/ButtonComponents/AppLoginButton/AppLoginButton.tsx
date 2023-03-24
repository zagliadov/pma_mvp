import { FC, useEffect } from "react";
import { isAuth } from "../../../redux/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logIn } from "../../../redux/authSlice/authSlice";
import { useNavigate } from "react-router-dom";

interface IProps {
  email: string;
  password: string;
}
export const AppLoginButton: FC<IProps> = ({ email, password }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { workspace_id, project_id, token } = useAppSelector(({ auth }) => ({
    workspace_id: auth.workspace_id,
    project_id: auth.project_id,
    token: auth.token,
  }));

  useEffect(() => {
    dispatch(isAuth());
    if (workspace_id && project_id && token) {
      navigate(`/main_table/${project_id}`);
    } else if (workspace_id && !project_id) {
      navigate(`/empty_state_project/${workspace_id}`);
    }
  }, [dispatch, navigate, project_id, token, workspace_id]);

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
