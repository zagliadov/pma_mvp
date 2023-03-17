import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/authSlice/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import {
  FaBellNotification,
  FaDropdownInformation,
  FaDropdownLogout,
  FaDropdownSettings,
  FaProfile,
} from "../../icons/icons";

export const UserSettingsNavigation: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="pl-8 pt-8">
      <div className="pb-4">
        <NavLink
          to="/user_settings/my_settings"
          className={({ isActive, isPending }: any) =>
            isPending
              ? "pending"
              : isActive
              ? "flex items-center w-[296px] bg-gray-50 py-3 pl-3 rounded"
              : "flex items-center w-[296px] py-3 pl-3 rounded"
          }
        >
          <FaProfile />
          <span className="pl-2">My settings</span>
        </NavLink>
        <NavLink
          to="/user_settings/notification"
          className={({ isActive, isPending }: any) =>
            isPending
              ? "pending"
              : isActive
              ? "flex items-center w-[296px] bg-gray-50 py-3 pl-3 rounded"
              : "flex items-center w-[296px] py-3 pl-3 rounded"
          }
        >
          <FaBellNotification />
          <span className="pl-2">Notification</span>
        </NavLink>
        <NavLink
          to="/user_settings/projects"
          className={({ isActive, isPending }: any) =>
            isPending
              ? "pending"
              : isActive
              ? "flex items-center w-[296px] bg-gray-50 py-3 pl-3 rounded"
              : "flex items-center w-[296px] py-3 pl-3 rounded"
          }
        >
          <FaDropdownSettings />
          <span className="pl-2">Projects</span>
        </NavLink>
        <NavLink
          to="/user_settings/information"
          className={({ isActive, isPending }: any) =>
            isPending
              ? "pending"
              : isActive
              ? "flex items-center w-[296px] bg-gray-50 py-3 pl-3 rounded"
              : "flex items-center w-[296px] py-3 pl-3 rounded"
          }
        >
          <FaDropdownInformation />
          <span className="pl-2">Information</span>
        </NavLink>
      </div>

      <div className="border-t pt-4">
        <button
          onClick={() => handleLogout()}
          className="flex items-center w-[296px] hover:bg-gray-50 py-3 pl-3 rounded"
        >
          <FaDropdownLogout />
          <span className="pl-2">Log out</span>
        </button>
      </div>
    </div>
  );
};
