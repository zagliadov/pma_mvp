import { FC } from "react";
import { FaSettings } from "../../icons/icons";

export const AppSettingsButton: FC = () => {
  return (
    <>
      <button>
        <FaSettings />
      </button>
      <div className="pl-4 flex items-center">
        <button
          type="button"
          className="w-10 h-10 bg-[url('assets/avatar-header.svg')] rounded-full"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        ></button>
      </div>
    </>
  );
};
