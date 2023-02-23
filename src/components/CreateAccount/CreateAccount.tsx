import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { AppGoogleLoginButton } from "../ButtonComponents/AppGoogleLoginButton/AppGoogleLoginButton";
import { AppAppleLoginButton } from "../ButtonComponents/AppAppleLoginButton/AppAppleLoginButton";
import { AppCreateAccountButton } from "../ButtonComponents/AppCreateAccountButton/AppCreateAccountButton";

export const CreateAccount: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex flex-row h-screen">
      <div className="desktop:w-1/2 tablet:w-full flex flex-col justify-center items-center">
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
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="pl-4 py-3 text-xs text-gray-400 border border-gray-100 rounded font-normal"
          />

          <label
            htmlFor="email"
            className="text-xs font-normal text-gray-600 pb-1 pt-4"
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
            placeholder="Enter Password"
            className="pl-4 py-3 text-xs text-gray-400 border border-gray-100 rounded font-normal"
          />

          <div className="pb-8"></div>
          <AppCreateAccountButton
            id={name}
            name={name}
            email={email}
            password={password}
          />
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
      <div className="desktop:w-1/2 bg-no-repeat bg-cover bg-[url('/home/developer/Desktop/pma_mvp/src/assets/rect.png')]"></div>
    </div>
  );
};
