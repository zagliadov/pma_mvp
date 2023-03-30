import { FC, useState, useRef, useEffect } from "react";
import { AvatarDropdownUserMenu } from "./AvatarDropdownUserMenu/AvatarDropdownUserMenu";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useAppDispatch } from "../../../../redux/hooks";
import { getUser } from "../../../../redux/userSettingsSlice/userSettingsSlice";

export const AppUserMenuButton: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [background, setBackground] = useState<any>("");
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    dispatch(getUser()).then(({ payload }) => {
      setUsername(payload.email.charAt(0));
      if (payload.avatar_filename) {
        setBackground(payload.avatar_filename);
      }
    });
  }, [dispatch]);
  const avatar =
    background !== ""
      ? `url("http://localhost:9000/user_settings/user_avatar/${background}")`
      : "";

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex" ref={dropdownRef}>
      <button
        style={{
          backgroundImage: avatar,
        }}
        onClick={() => handleOpen()}
        type="button"
        className="w-10 h-10 ml-4 bg-center bg-contain rounded-full bg-[url('assets/avatar-header.svg')]"
      ></button>
      <AvatarDropdownUserMenu isOpen={isOpen} avatar={avatar} />
    </div>
  );
};
