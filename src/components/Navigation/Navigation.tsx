import { FC } from "react";
import { SearchInput } from "./SearchInput/SearchInput";
import { MenuToggle } from "./MenuToggle/MenuToggle";
import { useLocation } from "react-router-dom";
import { UserMenu } from "./UserMenu/UserMenu";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { MainTableNavigation } from "./MainTableNavigation/MainTableNavigation";
import { MainTableSubNavigation } from "./MainTableSubNavigation/MainTableSubNavigation";

export const Navigation: FC = () => {
  const { pathname } = useLocation();
  const toggleIsActiveSidebar = useAppSelector(
    (state: RootState) => state.diff.isActiveSidebar
  );
  const exceptRoute =
    pathname === "/create_project" || pathname === "/empty_state_project";
  const shutdownEffect = exceptRoute && toggleIsActiveSidebar;
  const isMainRoute = pathname === "/main_table" || pathname === "/timeline";

  return (
    <div className="flex flex-col">
      <div
        className={`flex justify-start pr-4 py-2 border-b ${
          shutdownEffect ? "bg-gray-150 border-gray-300" : "bg-white"
        }
      `}
      >
        <MenuToggle />

        {isMainRoute && <MainTableNavigation />}

        <div className="flex w-full justify-end">
          <SearchInput />
          <UserMenu />
        </div>
      </div>
      {isMainRoute && <MainTableSubNavigation />}
    </div>
  );
};
