import { FC } from "react";
import { AppSettingsButton } from "./AppSettingsButton/AppSettingsButton";
import { AppNotificationButton } from "./AppNotificationButton/AppNotificationButton";
import { AppHelpButton } from "./AppHelpButton/AppHelpButton";
import { AppUserMenuButton } from "./AppUserMenuButton/AppUserMenuButton";

export const UserMenu: FC = () => {
  return (
    <div className="flex justify-center items-center pl-2">
      <AppHelpButton />
      <AppNotificationButton />
      <AppSettingsButton />
      <AppUserMenuButton />
    </div>
  );
};
