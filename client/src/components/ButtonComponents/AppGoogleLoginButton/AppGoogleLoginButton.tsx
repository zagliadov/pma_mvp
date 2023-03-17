import { FC } from "react";
import { FaApple } from "../../icons/icons";

export const AppGoogleLoginButton: FC = () => {
  return (
    <button className="flex justify-center items-center py-2.5 border border-gray-100 rounded">
      <FaApple />
      <span className="font-medium text-base text-gray-600 pl-2">
        Log in with Apple
      </span>
    </button>
  );
};
