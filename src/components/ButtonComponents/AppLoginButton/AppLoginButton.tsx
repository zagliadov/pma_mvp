import { FC, useEffect } from "react";
import { ILogInProps } from "../../../redux/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logIn } from "../../../redux/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

export const AppLoginButton: FC<ILogInProps> = ({ email, password }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEmptyState = useAppSelector(
    (state: RootState) => state.project.isEmptyState
  );
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      if (isEmptyState) {
        navigate("/empty_state");
      } else {
        navigate("/");
      }
    }
  }, [dispatch, isAuthenticated, isEmptyState, navigate]);

  const handleClick = () => {
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
