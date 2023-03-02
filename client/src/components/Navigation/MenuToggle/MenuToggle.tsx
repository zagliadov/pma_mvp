import { FC, useRef, useState, useEffect } from "react";
import { FaOpenMenu } from "../../icons/icons";
import { MenuToggleDropdown } from "./MenuToggleDropdown/MenuToggleDropdown";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { toggleIsActiveSidebar } from "../../../redux/diffSlice/diffSlice";

export const MenuToggle: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const isActiveSidebar = useAppSelector(
    (state: RootState) => state.diff.isActiveSidebar
  );

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    if (!isOpen) {
      dispatch(toggleIsActiveSidebar(false));
    }
  }, [dispatch, isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    dispatch(toggleIsActiveSidebar(!isActiveSidebar));
  };

  return (
    <div className={`flex z-[101]`} ref={dropdownRef}>
      <button onClick={() => handleToggle()} className="pl-4 flex items-center">
        <FaOpenMenu />
      </button>

      <MenuToggleDropdown isOpen={isOpen} handleToggle={handleToggle} />
    </div>
  );
};
