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
  const shutdownEffect = exceptRoute && toggleIsActiveSidebar;

  return (
    <div
      className={`flex justify-start pr-4 py-2 border-b ${
        shutdownEffect ? "bg-gray-150 border-gray-300" : "bg-white"
      }
      `}
    >
      <div className="flex w-[5%]">
        <MenuToggle />
      </div>

      <div className="flex items-center w-[40%]">
        <div className="pl-6 pr-4"><span>Project Name</span></div>
        <div className="px-4">Main Table</div>
        <div className="px-4">Timeline</div>
      </div>

      <div className="flex  w-full justify-end">
          <SearchInput />
          <UserMenu />
      </div>
    </div>
  );
};
