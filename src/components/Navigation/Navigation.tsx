import { FC } from "react";
import { SearchInput } from "./SearchInput/SearchInput";
import { MenuToggle } from "./MenuToggle/MenuToggle";
import { UserMenu } from "./UserMenu/UserMenu";

export const Navigation: FC = () => {
  return (
    <div className="flex justify-between pr-4 py-2">
      <MenuToggle />
      <SearchInput />

      <UserMenu />
    </div>
  );
};
