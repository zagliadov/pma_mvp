import { FC } from "react";
import { FaArrowLeft } from "../../icons/icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

export const UserSettingsHeader: FC = () => {
  const navigate = useNavigate();
  const colorAvatar = localStorage.getItem("color");
  const userLanguage = useAppSelector(
    (state: RootState) => state.user.userLanguage
  );
  const userTimezone = useAppSelector(
    (state: RootState) => state.user.userTimezone
  );
  const { userFirstname, userLastname, userEmail, userPhone } = useAppSelector(
    (state: RootState) => state.user
  );
  const handleBackToTable = () => {
    navigate("/");
  };
  const handleSaveChanges = () => {
    console.log(userLanguage, "userLanguage");
    console.log(userTimezone, "userTimezone");
    console.log(userFirstname, "userFirstname");
    console.log(userLastname, "userLastname");
    console.log(userEmail, "userEmail");
    console.log(userPhone, "userPhone");
  };
  return (
    <div className="flex justify-between py-2 px-8 border-b">
      <button onClick={() => handleBackToTable()} className="flex items-center">
        <FaArrowLeft />
        <span className="pl-2">Back to table</span>
      </button>

      <div className="flex">
        <button className="bg-primary-50 rounded py-2.5 px-6">
          <span className="text-base text-primary-600">Changes saved</span>
        </button>
        <div className="px-2"></div>
        <button
          className="bg-primary-500 rounded py-2.5 px-6"
          onClick={() => handleSaveChanges()}
        >
          <span className="text-base text-white">Save changes</span>
        </button>
      </div>
    </div>
  );
};
