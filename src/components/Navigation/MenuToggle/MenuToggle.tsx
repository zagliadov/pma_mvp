import { FC, useState } from "react";
import { FaOpenMenu, FaCloseMenu } from "../../icons/icons";

export const MenuToggle: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex w-auto pl-4">
      <button onClick={() => setOpen(!open)}>
        {open ? <FaCloseMenu /> : <FaOpenMenu />}
      </button>
    </div>
  );
};
