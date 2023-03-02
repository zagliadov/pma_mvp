import { FC } from "react";
import { FaSearch } from "../../icons/icons";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

export const SearchInput: FC = () => {
  const { pathname } = useLocation();
  const toggleIsActiveSidebar = useAppSelector(
    (state: RootState) => state.diff.isActiveSidebar
  );
  // w-10/12
  const exceptRoute =
    pathname === "/create_project" || pathname === "/empty_state_project";
  const shutdownEffect = exceptRoute && toggleIsActiveSidebar;
  console.log(shutdownEffect);
  return (
    <div className="flex w-full justify-end items-center">
      <button
        type="submit"
        disabled
        className="px-2.5 z-10 mr-[-35px] focus:outline-none focus:shadow-outline"
      >
        <FaSearch />
      </button>
      <input
        type="search"
        className={`py-2 border border-gray-100 focus:w-full text-gray-600 text-sm rounded pl-8 focus:outline-none ${
          shutdownEffect ? "bg-gray-150 border-gray-300" : "bg-white"
        }`}
        placeholder="Search..."
      />
    </div>
  );
};
