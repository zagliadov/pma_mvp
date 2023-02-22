import { FC } from "react";
import { FaGoogle } from "../../icons/icons";

export const AppleLoginButton: FC = () => {
  return (
    <button className="flex justify-center items-center py-2.5 border border-gray-100 rounded">
      <FaGoogle />
      <span className="font-medium text-base text-gray-600 pl-2">
        Log in with Google
      </span>
    </button>
  );
};
