import { FC } from "react";

interface IProps {
  menuAvatarToggle: boolean;
  setMenuAvatarToggle: Function;
}
export const AppUserMenuButton: FC<IProps> = ({
  menuAvatarToggle,
  setMenuAvatarToggle,
}) => {
  return (
    <button
      onClick={() => setMenuAvatarToggle(!menuAvatarToggle)}
      type="button"
      className="w-10 h-10 ml-4 bg-[url('assets/avatar-header.svg')] rounded-full"
      id="user-menu-button"
      aria-expanded="false"
      data-dropdown-toggle="user-dropdown"
      data-dropdown-placement="bottom"
    ></button>
  );
};
