import { FC } from "react";
import { ILogInProps } from "../../../redux/authSlice/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { logIn, login } from "../../../redux/authSlice/authSlice";
import { useNavigate } from "react-router-dom";

export const AppLoginButton: FC<ILogInProps> = ({ email, password }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(logIn({ email, password }));
    dispatch(login());
    navigate("/");
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
