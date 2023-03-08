import { FC } from "react";
import { FaProfile } from "../../../../icons/icons";

export const AssigneeButton: FC = () => {

  return (
    <div className="pl-4">
      <button className="flex items-center border border-gray-100 rounded px-4 py-1.5">
        <FaProfile />
        <span className="pl-1.5 font-medium font-sm text-gray-600">Assignee</span>
      </button>
    </div>
  )
}