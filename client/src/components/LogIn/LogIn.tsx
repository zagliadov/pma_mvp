import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppGoogleLoginButton } from "../ButtonComponents/AppGoogleLoginButton/AppGoogleLoginButton";
import { AppAppleLoginButton } from "../ButtonComponents/AppAppleLoginButton/AppAppleLoginButton";
import { AppLoginButton } from "../ButtonComponents/AppLoginButton/AppLoginButton";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

export const LogIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const message: string = useAppSelector(
    (state: RootState) => state.auth.message
  );
  const status: number | null = useAppSelector(
    (state: RootState) => state.auth.status
  );
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("task:priority");
    localStorage.removeItem("subtask:priority");
  }, []);

  return (
    <div className="flex flex-row h-screen">
      <div className="desktop:w-1/2 tablet:w-full flex flex-col justify-center items-center">
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
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="pl-4 py-3 text-xs text-gray-400 border border-gray-100 rounded font-normal"
          />

          <label
            htmlFor="password"
            className="text-xs font-normal text-gray-600 pb-1 pt-4"
          >
            Password
          </label>
          <input
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="pl-4 py-3 text-xs text-gray-400 border border-gray-100 rounded font-normal"
          />
          <div className="relative">
            <span className="absolute text-red-500 text-xs left-[35%]">
              {message}
            </span>
          </div>

          <Link
            to="/forgot_password"
            className="text-gray-600 font-medium text-xs pt-4"
          >
            Forgot Password?
          </Link>
          <div className="pb-8"></div>
          <AppLoginButton email={email} password={password} status={status} />
          <div className="pb-8"></div>

          <div className="flex item-center">
            <hr className="w-full border-gray-50 mt-2" />
            <span className="px-4 text-gray-400 text-xs font-normal">or</span>
            <hr className="w-full border-gray-50 mt-2" />
          </div>

          <div className="pb-8"></div>
          <AppAppleLoginButton />

          <div className="pb-4"></div>
          <AppGoogleLoginButton />

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
      <div className="desktop:w-1/2 bg-no-repeat bg-cover bg-gray-50"></div>
    </div>
  );
};
