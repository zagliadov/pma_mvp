import { FC } from "react";
import { SearchInput } from "./SearchInput/SearchInput";
import { MenuToggle } from "./MenuToggle/MenuToggle";
import { useLocation, useParams } from "react-router-dom";
import { UserMenu } from "./UserMenu/UserMenu";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { MainTableNavigation } from "./MainTableNavigation/MainTableNavigation";
import { MainTableSubNavigation } from "./MainTableSubNavigation/MainTableSubNavigation";

export const Navigation: FC = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const toggleIsActiveSidebar = useAppSelector(
    (state: RootState) => state.diff.isActiveSidebar
  );
  const shutdownEffect = toggleIsActiveSidebar;
  const isMainRoute = pathname === `/main_table/${params.project_id}` || pathname === `/timeline/${params.project_id}`;
  return (
    <div className="flex flex-col">
      <div
        className={`flex justify-start pr-4 py-2 border-b`}
      >
        <MenuToggle />

        <div className={`desktop:flex hidden items-center w-[40%] ${shutdownEffect ? "blur-[2px]" : ""}`}>
          {isMainRoute && <MainTableNavigation />}
        </div>
        
        
        <div className={`flex w-full justify-end ${
          shutdownEffect ? "blur-[2px]" : "bg-white"
        }`}>
          <SearchInput />
          <UserMenu />
        </div>
      </div>
      {isMainRoute && <MainTableSubNavigation />}
    </div>
  );
};
