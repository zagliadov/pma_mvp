import { FC, useState } from "react";
import { FaOpenMenu, FaCloseMenu, FaSearch } from "../icons/icons";

export const Navigation: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex justify-between p-2">
      <button onClick={() => setOpen(!open)}>
        {open ? <FaCloseMenu /> : <FaOpenMenu />}
      </button>

      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center px-2.5">
          <button
            type="submit"
            className="focus:outline-none focus:shadow-outline"
          >
            <FaSearch />
          </button>
        </span>
        <input
          type="search"
          className="py-2 border border-gray-100 text-gray-600 text-sm rounded pl-8 focus:outline-none"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};
