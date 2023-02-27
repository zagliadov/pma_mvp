import { FC, useState, useRef, useEffect } from "react";
import { AppNotificationDropdown } from "../AppNotificationDropdown/AppNotificationDropdown";
import { FaNotification } from "../../../icons/icons";
import { useClickOutside } from "../../../../hooks/useClickOutside";

export const AppNotificationButton: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="flex" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <FaNotification />
      </button>
      <AppNotificationDropdown isOpen={isOpen} />
    </div>
  );
};
