import { FC, useState } from "react";
import {
  FaArrowRight,
  FaDoubleCheck,
  FaDropdownSettings,
  FaPaperClip,
} from "../../../../icons/icons";
import { useAppSelector } from "../../../../../redux/hooks";
import { SwitchShowOnlyUnread } from "../SwitchShowOnlyUnread/SwitchShowOnlyUnread";
import { RootState } from "../../../../../redux/store";
import { FaTrashButton } from "../../../../icons/icons";

interface IProps {
  isOpen: boolean;
}
export const AppNotificationDropdown: FC<IProps> = ({ isOpen }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const user = useAppSelector((state: RootState) => state.auth.user);

  const handleChangeShowOnlyUnread = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <div
      className={`absolute flex-col top-16 bg-white right-2 border rounded-lg w-[640px] pt-4 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="flex justify-between pb-4 px-4 border-b border-gray-50">
        <div>
          <span className="text-lg font-medium">Notifications</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 font-normal">
            Show only unread
          </span>
          <SwitchShowOnlyUnread
            id={"example-switch"}
            checked={isChecked}
            onChange={handleChangeShowOnlyUnread}
          />
          <button className="pl-4">
            <FaDropdownSettings />
          </button>
        </div>
      </div>

      <div className="py-4 px-4">
        <div className="flex justify-between pb-2">
          <div>
            <span className="text-sm">username</span>
            <span className="text-gray-400 text-sm">
              {" "}
              comments on the{" "}
              <span className="text-black text-sm">"task name"</span> task
            </span>
          </div>
          <div>
            <span className="text-gray-400 text-xs">2 days ago</span>
          </div>
        </div>
        <div className="bg-gray-50 py-3 px-4 rounded-lg">
          <p className="text-sm font-normal">
            A libero cursus duis pulvinar malesuada quisque lectus. Venenatis
            egestas id sem sed egestas aliquet a feugiat nisi. Sapien mattis
            proin ultricies ante.
          </p>
        </div>
      </div>

      <div className="px-4 border-t pb-4 pt-4">
        <div className="flex justify-between pb-2">
          <div>
            <span className="text-sm">username</span>
            <span className="text-gray-400 text-sm">
              {" "}
              adds a file to the{" "}
              <span className="text-black text-sm">"task name"</span> task
            </span>
          </div>
          <div>
            <span className="text-gray-400 text-xs">5 days ago</span>
          </div>
        </div>

        <div className="flex">
          <div className="border border-gray-50 rounded px-4 py-4">
            <span>"filename"."file format"</span>
            <div className="flex items-center justify-between pt-7">
              <div className="flex items-center">
                <button>
                  <FaPaperClip />
                </button>

                <span className="pl-2.5 text-gray-400 text-xs">
                  "file size" MB
                </span>
              </div>

              <button className="">
                <FaTrashButton />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between border-t border-gray-50 px-4 py-4">
        <button className="flex items-center">
          <FaDoubleCheck />
          <span className="pl-1 font-medium text-sm text-gray-600">
            Mark all as read
          </span>
        </button>
        <button className="flex items-center">
          <span className="font-medium text-sm text-gray-600 pr-1">Show all notifications</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
