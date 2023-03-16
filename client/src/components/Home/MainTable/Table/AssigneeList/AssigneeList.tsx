import { FC } from "react";

interface IProps {
  assignee: any;
}
export const AssigneeList: FC<IProps> = ({ assignee }) => {
  const truncatedAssignee =
    assignee.length > 3 ? assignee.slice(0, 3) : assignee;
  const quantity: number = assignee.length - truncatedAssignee.length;
  return (
    <div className="flex">
      {truncatedAssignee.map((item: any, index: number) => {
        return (
          <div
            className={`flex items-center bg-gray-50 ml-[-15px] z-[${
              index * 2
            }] justify-center w-8 h-8 border rounded-full`}
            key={JSON.parse(item).id}
          >
            <span>{JSON.parse(item).email.charAt(0)}</span>
          </div>
        );
      })}
      <button
        className="flex items-center justify-center w-8 h-8 border bg-white rounded-full ml-[-15px]"
      >
        <span className="font-medium text-xs">
          + {quantity === 0 ? "" : quantity}
        </span>
      </button>
    </div>
  );
};
