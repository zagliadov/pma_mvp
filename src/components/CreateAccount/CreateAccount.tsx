import { FC } from "react";
import { Link } from "react-router-dom";
import { GoogleLoginButton } from "../ButtonComponents/GoogleLoginButton/GoogleLoginButton";
import { AppleLoginButton } from "../ButtonComponents/AppleLoginButton/AppleLoginButton";
import { AppLoginButton } from "../ButtonComponents/AppLoginButton/AppLoginButton";

export const CreateAccount: FC = () => {
  return (
    <div className="w-1/2 flex flex-col justify-center items-center">
      <div className="w-[464px] h-[512px] flex flex-col">
        <p className="text-2xl pb-8">Create account</p>

        <label
          htmlFor="name"
          className="text-xs font-normal text-gray-600 pb-1"
        >
          Name
        </label>
        <input
          type="text"
          value="Enter your name"
          className="pl-4 py-3 text-xs text-gray-400 border border-gray-100 rounded font-normal"
        />

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
            Already have an account?
          </span>
          <Link
            to="/login"
            className="text-gray-600 font-medium text-sm pl-2"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
