import { FC } from "react";
import { AppHelpButton } from "../../ButtonComponents/AppHelpButton/AppHelpButton";
import { AppNotificationButton } from "../../ButtonComponents/AppNotificationButton/AppNotificationButton";
import { AppSettingsButton } from "../../ButtonComponents/AppSettingsButton/AppSettingsButton";

export const UserMenu: FC = () => {
  return (
    <div className="flex justify-center items-center pl-2">
      <AppHelpButton />
      <AppNotificationButton />
      <AppSettingsButton />
    </div>
  );
};
