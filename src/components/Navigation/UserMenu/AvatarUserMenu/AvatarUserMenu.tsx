import { FC, useRef } from "react";

interface IProps {
  menuAvatarToggle: boolean;
  setMenuAvatarToggle: Function;
}
export const AvatarUserMenu: FC<IProps> = ({
  menuAvatarToggle,
  setMenuAvatarToggle,
}) => {
  const menuRef = useRef(null);
  const handleClick = (e: any) => {
    if (!menuRef.current) return;
    if (menuRef.current !== e.target) {
      console.log(e.target)
      setMenuAvatarToggle(false);
    }
  };
  return (
    <div
      ref={menuRef}
      onClick={(e) => handleClick(e)}
      className={`absolute top-14 right-2 border w-60 h-60 ${
        menuAvatarToggle ? "flex" : "hidden"
      }`}
    >
      <div>test</div>
    </div>
  );
};
