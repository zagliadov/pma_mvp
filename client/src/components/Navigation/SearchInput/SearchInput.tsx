import { FC } from "react";
import { FaSearch } from "../../icons/icons";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

export const SearchInput: FC = () => {
  const toggleIsActiveSidebar = useAppSelector(
    (state: RootState) => state.diff.isActiveSidebar
  );
  const shutdownEffect = toggleIsActiveSidebar;
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
