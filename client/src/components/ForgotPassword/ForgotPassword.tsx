import { ChangeEvent, FC, useState } from "react";
import { AppResetPasswordButton } from "../ButtonComponents/AppResetPasswordButton/AppResetPasswordButton";
import { FaArrow } from "../icons/icons";
import { Link } from "react-router-dom";

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="desktop:w-1/2 tablet:w-full flex flex-col items-center">
        <div className="flex flex-col h-screen justify-start">
          <div className="flex justify-start pt-8 pb-40">
            <Link
              to="/login"
              className="flex flex-row items-center py-2.5 px-7 border border-gray-100 rounded"
            >
              <FaArrow />
              <span className="pl-2.5">Back to Log in</span>
            </Link>
          </div>
          <div className="w-[464px] h-[512px] flex flex-col">
            <p className="text-2xl pb-8">Forgot password?</p>
            <label
              htmlFor="email"
              className="text-xs font-normal text-gray-600 pb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="Enter email"
              className="pl-4 py-3 text-xs text-gray-400 border border-gray-100 rounded font-normal"
            />

            <p className="text-sm font-normal text-gray-600 py-8">
              We will send you the link to your email. You will be able to
              create a new password
            </p>

            <AppResetPasswordButton email={email} />
          </div>
        </div>
      </div>
      <div className="desktop:w-1/2 bg-no-repeat bg-cover bg-gray-50"></div>
    </div>
  );
};
