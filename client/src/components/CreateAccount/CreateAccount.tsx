import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppGoogleLoginButton } from "../ButtonComponents/AppGoogleLoginButton/AppGoogleLoginButton";
import { AppAppleLoginButton } from "../ButtonComponents/AppAppleLoginButton/AppAppleLoginButton";
import { AppCreateAccountButton } from "../ButtonComponents/AppCreateAccountButton/AppCreateAccountButton";
import { RootState } from "../../redux/store";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setMessage, setStatus } from "../../redux/authSlice/authSlice";

export const CreateAccount: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [workspace, setWorkspace] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state: RootState) => state.auth.status);
  const message = useAppSelector((state: RootState) => state.auth.message);

  useEffect(() => {
    if (status === 201) {
      navigate("/login");
      dispatch(setStatus(0));
      dispatch(setMessage(""));
    }
  }, [dispatch, navigate, status]);

  return (
    <div className="flex flex-row h-screen">
      <div className="desktop:w-1/2 tablet:w-full flex flex-col justify-center items-center">
        <div className="w-[464px] h-[512px] flex flex-col">
          <p className="text-2xl pb-8">Create account</p>

          <label
            htmlFor="name"
            className="text-xs font-normal text-gray-600 pb-1"
          >
            User name
          </label>
          <input
            type="text"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="pl-4 py-3 text-xs text-gray-400 border border-gray-100 rounded font-normal"
          />

          <label
            htmlFor="workspace"
            className="text-xs font-normal text-gray-600 pb-1 pt-4"
          >
            Workspace name
          </label>
          <input
            type="text"
            name="workspace"
            onChange={(e) => setWorkspace(e.target.value)}
            placeholder="Enter your name"
            className="pl-4 py-3 text-xs text-gray-400 border border-gray-100 rounded font-normal"
          />

          <label
            htmlFor="email"
            className="text-xs font-normal text-gray-600 pb-1 pt-4"
          >
            Email <span className="text-red-500 pl-4">{message}</span>
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
            username={username}
            workspace={workspace}
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
      <div className="desktop:w-1/2 bg-no-repeat bg-cover bg-gray-50"></div>
    </div>
  );
};
