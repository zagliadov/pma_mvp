import { FC } from "react";
import { SearchInput } from "./SearchInput/SearchInput";
import { MenuToggle } from "./MenuToggle/MenuToggle";
import { useLocation } from "react-router-dom";
import { UserMenu } from "./UserMenu/UserMenu";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

export const Navigation: FC = () => {
  const { pathname } = useLocation();
  const toggleIsActiveSidebar = useAppSelector(
    (state: RootState) => state.diff.isActiveSidebar
  );
  const exceptRoute =
    pathname === "/create_project" || pathname === "/empty_state_project";

  return (
    <div
      className={`flex justify-between pr-4 py-2 border-b ${
        exceptRoute && "bg-gray-150 border-gray-300"
      }
      ${!toggleIsActiveSidebar && "bg-white"}`}
    >
      <MenuToggle />
      <SearchInput />

      <UserMenu />
    </div>
  );
};
