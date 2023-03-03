import { FC } from "react";
import { useAppDispatch } from "../../../../../redux/hooks";
import { logout } from "../../../../../redux/authSlice/authSlice";
import {
  FaBellNotification,
  FaDropdownInformation,
  FaDropdownLogout,
  FaDropdownSettings,
  FaProfile,
} from "../../../../icons/icons";
import { useNavigate } from "react-router-dom";

interface IProps {
  isOpen: boolean;
}

export const AvatarDropdownUserMenu: FC<IProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      className={`absolute flex-col top-16 bg-white right-2 border rounded-lg w-80 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="flex justify-start items-center border-b border-gray-50 py-4">
        <button
          type="button"
          className="w-10 h-10 ml-4 bg-[url('assets/avatar-header.svg')] rounded-full"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        ></button>

        <div className="flex flex-col pl-4">
          <span className="text-base font-medium">username</span>
          <span className="text-gray-400 text-sm font-normal">username</span>
        </div>
      </div>

      <div className="px-4 pt-4">
        <button className="flex w-full pb-4">
          <FaProfile />
          <span className="text-xs font-normal pl-2">Profile</span>
        </button>

        <button className="flex w-full pb-4">
          <FaBellNotification />
          <span className="text-xs font-normal pl-2">Notification</span>
        </button>

        <button className="flex w-full pb-4">
          <FaDropdownSettings />
          <span className="text-xs font-normal pl-2">Settings</span>
        </button>

        <button className="flex w-full pb-4">
          <FaDropdownInformation />
          <span className="text-xs font-normal pl-2">Information</span>
        </button>
      </div>

      <div className="px-4">
        <button
          onClick={() => handleLogout()}
          className="flex w-full items-center border-t border-gray-50 py-4"
        >
          <FaDropdownLogout />
          <span className="pl-2 text-xs font-normal text-red-600">Log out</span>
        </button>
      </div>
    </div>
  );
};
