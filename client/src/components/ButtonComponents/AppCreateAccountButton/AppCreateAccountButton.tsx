import { FC } from "react";
import { ICreateAccountProps } from "../../../redux/authSlice/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { createAccount, login } from "../../../redux/authSlice/authSlice";
import { useNavigate } from "react-router-dom";

export const AppCreateAccountButton: FC<ICreateAccountProps> = ({
  username,
  workspace,
  email,
  password,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(createAccount({ username, workspace, email, password }));
    // dispatch(login());
    // navigate("/");
  };
  return (
    <button
      onClick={handleClick}
      className="bg-primary-500 text-white font-medium text-base py-2.5 rounded"
    >
      Create account
    </button>
  );
};
