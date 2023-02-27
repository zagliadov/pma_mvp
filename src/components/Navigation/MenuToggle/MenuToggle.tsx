import { FC, useRef, useState, useEffect } from "react";
import { FaOpenMenu, FaCloseMenu, FaCheckCircle } from "../../icons/icons";
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
    <div className={`flex flex-col`} ref={dropdownRef}>
      {isOpen ? (
        <div className="flex items-center justify-between box-border px-4 w-80 z-[100]">
          <div className="flex items-center">
            <FaCheckCircle />
            <span className="text-sm font-bold pl-1 uppercase tracking-[0.08em]">
              saas-mvp
            </span>
          </div>
          <div className="flex items-center justify-between box-border pl-4">
            <button onClick={() => handleToggle()} className="pl-4">
              <FaCloseMenu />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between box-border px-4">
          <button onClick={() => handleToggle()} className="pl-4 flex">
            <FaOpenMenu />
          </button>
        </div>
      )}

      <MenuToggleDropdown isOpen={isOpen} />
    </div>
  );
};
