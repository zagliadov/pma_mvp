import { FC } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { forgotPassword } from "../../../redux/authSlice/authSlice";
interface IResetPasswordProps {
  email: string;
}

export const ResetPassword: FC<IResetPasswordProps> = ({ email }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(forgotPassword(email));
  };
  return (
    <button
      onClick={handleClick}
      className="bg-primary-500 text-white font-medium text-base py-2.5 rounded"
    >
      Reset password
    </button>
  );
};
