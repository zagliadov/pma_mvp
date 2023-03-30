import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { logout } from "../../../../../redux/authSlice/authSlice";
import {
  FaBellNotification,
  FaDropdownInformation,
  FaDropdownLogout,
  FaDropdownSettings,
  FaProfile,
} from "../../../../icons/icons";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../../../redux/store";
interface IProps {
  isOpen: boolean;
  avatar: string;
}

export const AvatarDropdownUserMenu: FC<IProps> = ({ isOpen, avatar }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      className={`absolute z-[1] flex-col top-16 shadow-lg bg-white right-2 border rounded-lg w-80 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="flex justify-start items-center border-b border-gray-50 py-4">
        <button
          style={{ backgroundImage: avatar }}
          type="button"
          className="w-10 h-10 ml-4 rounded-full bg-center bg-contain bg-[url('assets/avatar-header.svg')]"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        ></button>

        <div className="flex flex-col pl-4">
          <span className="text-base font-medium">{user.username}</span>
          <span className="text-gray-400 text-sm font-normal">username</span>
        </div>
      </div>

      <div className="px-4 pt-4">
        <Link to="/user_settings/my_settings" className="flex w-full pb-4">
          <FaProfile />
          <span className="text-xs font-normal pl-2">Profile</span>
        </Link>

        <Link to="/user_settings/notification" className="flex w-full pb-4">
          <FaBellNotification />
          <span className="text-xs font-normal pl-2">Notification</span>
        </Link>

        <Link to="/user_settings/projects" className="flex w-full pb-4">
          <FaDropdownSettings />
          <span className="text-xs font-normal pl-2">Projects</span>
        </Link>

        <Link to="/user_settings/information" className="flex w-full pb-4">
          <FaDropdownInformation />
          <span className="text-xs font-normal pl-2">Information</span>
        </Link>
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
