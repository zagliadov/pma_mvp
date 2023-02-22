import { FC } from "react";
import { Link } from "react-router-dom";
import { GoogleLoginButton } from "../ButtonComponents/GoogleLoginButton/GoogleLoginButton";
import { AppleLoginButton } from "../ButtonComponents/AppleLoginButton/AppleLoginButton";
import { AppLoginButton } from "../ButtonComponents/AppLoginButton/AppLoginButton";

export const LogIn: FC = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="w-[464px] h-[512px] flex flex-col">
          <p className="text-2xl pb-8">Log in</p>
          <label
            htmlFor="email"
            className="text-xs font-normal text-gray-600 pb-1"
          >
            Email
          </label>
          <input
            type="email"
            value="Enter email"
            className="pl-4 py-3 text-xs text-gray-400 border border-gray-100 rounded font-normal"
          />

          <label
            htmlFor="password"
            className="text-xs font-normal text-gray-600 pb-1 pt-4"
          >
            Password
          </label>
          <input
            type="password"
            value="Enter password"
            className="pl-4 py-3 text-xs text-gray-400 border border-gray-100 rounded font-normal"
          />

          <Link
            to="/forgot_password"
            className="text-gray-600 font-medium text-xs pt-4"
          >
            Forgot Password?
          </Link>
          <div className="pb-8"></div>
          <AppLoginButton />
          <div className="pb-8"></div>

          <div className="flex item-center">
            <hr className="w-full border-gray-50 mt-2" />
            <span className="px-4 text-gray-400 text-xs font-normal">or</span>
            <hr className="w-full border-gray-50 mt-2" />
          </div>

          <div className="pb-8"></div>
          <AppleLoginButton />

          <div className="pb-4"></div>
          <GoogleLoginButton />

          <div className="pt-[72px]"></div>
          <div>
            <span className="text-sm text-gray-600 font-normal">
              Don't have an account yet?
            </span>
            <Link
              to="/create_account"
              className="text-gray-600 font-medium text-sm pl-2"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2 border"></div>
    </div>
  );
};
