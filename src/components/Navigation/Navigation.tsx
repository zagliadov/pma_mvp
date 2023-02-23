import { FC, useState } from "react";
import { FaOpenMenu, FaCloseMenu } from "../icons/icons";
import { SearchInput } from "./SearchInput/SearchInput";

export const Navigation: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex justify-between p-2">
      <div className="border w-1/5">
        <button onClick={() => setOpen(!open)}>
          {open ? <FaCloseMenu /> : <FaOpenMenu />}
        </button>
      </div>

      <SearchInput />

      <div className="w-1/5 border"></div>
    </div>
  );
};
