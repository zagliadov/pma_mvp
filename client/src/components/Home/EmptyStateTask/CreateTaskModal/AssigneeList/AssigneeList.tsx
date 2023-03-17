import { FC } from "react";
import { useAppDispatch } from "../../../../../redux/hooks";
import { toggleIsAssigneeModalOpen } from "../../../../../redux/diffSlice/diffSlice";

interface IProps {
  truncatedAssignee: { id: number; email: string }[];
  taskAssignee: { id: number; email: string }[];
}
export const AssigneeList: FC<IProps> = ({
  truncatedAssignee,
  taskAssignee,
}) => {
  const dispatch = useAppDispatch();
  const handleOpenModal = () => {
    dispatch(toggleIsAssigneeModalOpen(true));
  };
  const quantity: number = taskAssignee.length - truncatedAssignee.length;
  return (
    <div className="flex pl-8">
      {truncatedAssignee.map(
        (assignee: { id: number; email: string }, index: number) => {
          return (
            <div
              className={`flex items-center bg-gray-50 ml-[-15px] z-[${
                index * 2
              }] justify-center w-8 h-8 border rounded-full`}
              key={assignee.id}
            >
              <span>{assignee.email.charAt(0)}</span>
            </div>
          );
        }
      )}
      <div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center w-8 h-8 border bg-white rounded-full ml-[-15px]"
        >
          <span className="font-medium text-xs">
            + {quantity === 0 ? "" : quantity}
          </span>
        </button>
      </div>
    </div>
  );
};
