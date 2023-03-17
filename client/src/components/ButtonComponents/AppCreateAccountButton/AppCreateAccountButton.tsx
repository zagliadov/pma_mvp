import { FC, useEffect } from "react";
import { ICreateAccountProps } from "../../../redux/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createAccount } from "../../../redux/authSlice/authSlice";

export const AppCreateAccountButton: FC<ICreateAccountProps> = ({
  username,
  workspace,
  email,
  password,
}) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (username === "" && workspace === "" && email === "" && password === "") return;
    dispatch(createAccount({ username, workspace, email, password }));
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
