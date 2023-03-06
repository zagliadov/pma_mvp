import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaCloseMenu,
  FaPlusSpace,
  FaYourSpace,
} from "../../../icons/icons";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import {
  IWorkspaces,
  addNewWorkspace,
  getWorkspaces,
} from "../../../../redux/workspacesSlice/workspacesSlice";
import { WorkspacesOption } from "./WorkspacesOption/WorkspacesOption";

interface IProps {
  isOpen: boolean;
  handleToggle: Function;
  setParentMenuIsOpen: Function;
}
export const MenuToggleDropdown: FC<IProps> = ({ isOpen, handleToggle, setParentMenuIsOpen }) => {
  const [isDisclosed, setIsDisclosed] = useState<boolean>(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [newWorkspaceInput, setNewWorkspaceInput] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const token = localStorage && localStorage.getItem("token");
  const workspaces: IWorkspaces[] = useAppSelector(
    (state: RootState) => state.workspaces.workspaces
  );
  const handleOpenInput = () => {
    setNewWorkspaceInput(!newWorkspaceInput);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (newWorkspaceName === "") return;
      if (!inputRef.current) return;
      if (!token) return;
      dispatch(addNewWorkspace({ token, workspace_name: newWorkspaceName }));
      inputRef.current.value = "";
    }
  };
  const handleOpen = () => {
    setIsDisclosed(!isDisclosed);
    if (!token) return;
    if (!isDisclosed) {
      dispatch(getWorkspaces(token));
    }
  };
  return (
    <div
      className={`absolute flex-col top-0 left-0 bg-white border border-gray-300 w-80 h-screen ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between pl-4 pr-1 pt-[7px] pb-[8px] border-b border-gray-300">
        <div className="flex items-center">
          <FaCheckCircle />
          <span className="text-sm font-bold pl-1 uppercase tracking-[0.08em]">
            saas-mvp
          </span>
        </div>
        <button onClick={() => handleToggle()} className="flex">
          <FaCloseMenu />
        </button>
      </div>

      <div className="pt-4">
        <button
          onClick={() => handleOpen()}
          className="flex items-center justify-between w-full px-4"
        >
          <div className="flex items-center">
            <FaYourSpace />
            <span className="pl-2 text-base font-normal">Your spaces</span>
          </div>
          <div>{isDisclosed ? <FaChevronUp /> : <FaChevronDown />}</div>
        </button>
        {isDisclosed && (
          <div className="">
            <div>
              <button
                className="flex items-center pl-10 pt-4"
                onClick={() => handleOpenInput()}
              >
                <FaPlusSpace />
                <span className="pl-2 text-primary-500 font-medium text-sm">
                  New space
                </span>
              </button>
              {newWorkspaceInput && (
                <div className="flex justify-center">
                  <input
                    type="text"
                    ref={inputRef}
                    className="focus:outline-none"
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    placeholder="Press enter to create workspace..."
                  />
                </div>
              )}
            </div>

            <WorkspacesOption
              workspaces={workspaces}
              parentMenuIsOpen={isOpen}
              setParentMenuIsOpen={setParentMenuIsOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
};
