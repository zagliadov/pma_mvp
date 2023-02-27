import { FC, useState, useRef } from "react";
import { AvatarDropdownUserMenu } from "../AvatarDropdownUserMenu/AvatarDropdownUserMenu";
import { useClickOutside } from "../../../../hooks/useClickOutside";
export const AppUserMenuButton: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="flex" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="w-10 h-10 ml-4 bg-[url('assets/avatar-header.svg')] rounded-full"
      ></button>
      <AvatarDropdownUserMenu isOpen={isOpen} />
    </div>
  );
};
