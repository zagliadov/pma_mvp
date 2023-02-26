import { FC, useState } from "react";
import { AppSettingsButton } from "./AppSettingsButton/AppSettingsButton";
import { AppNotificationButton } from "./AppNotificationButton/AppNotificationButton";
import { AppHelpButton } from "./AppHelpButton/AppHelpButton";
import { AppUserMenuButton } from "./AppUserMenuButton/AppUserMenuButton";
import { AvatarUserMenu } from "./AvatarUserMenu/AvatarUserMenu";

export const UserMenu: FC = () => {
  const [menuAvatarToggle, setMenuAvatarToggle] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center pl-2">
      <AppHelpButton />
      <AppNotificationButton />
      <AppSettingsButton />
      <AppUserMenuButton
        setMenuAvatarToggle={setMenuAvatarToggle}
        menuAvatarToggle={menuAvatarToggle}
      />
      <AvatarUserMenu
        menuAvatarToggle={menuAvatarToggle}
        setMenuAvatarToggle={setMenuAvatarToggle}
      />
    </div>
  );
};
