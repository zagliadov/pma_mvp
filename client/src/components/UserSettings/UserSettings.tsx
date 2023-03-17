import { FC, useEffect } from "react";
import { UserSettingsHeader } from "./UserSettingsHeader/UserSettingsHeader";
import { Outlet } from "react-router-dom";
import { UserSettingsNavigation } from "./UserSettingsNavigation/UserSettingsNavigation";
import { useAppDispatch } from "../../redux/hooks";
import { getVerifyUser } from "../../redux/userSettingsSlice/userSettingsSlice";

export const UserSettings: FC = () => {
  const token: string = localStorage.getItem("token") as string;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;
    dispatch(getVerifyUser(token));
  }, [dispatch, token]);

  return (
    <div>
      <UserSettingsHeader />
      <div className="flex">
        <UserSettingsNavigation />

        <div className="py-8 pl-16 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
