import { FC } from "react";
import { ILogInProps } from "../../../redux/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logIn, login } from "../../../redux/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

export const AppLoginButton: FC<ILogInProps> = ({ email, password }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEmptyState = useAppSelector(
    (state: RootState) => state.project.isEmptyState
  );
  const handleClick = () => {
    dispatch(logIn({ email, password }));
    dispatch(login());
    if (isEmptyState) {
      navigate("/empty_state");
    } else {
      navigate("/");
    }
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
