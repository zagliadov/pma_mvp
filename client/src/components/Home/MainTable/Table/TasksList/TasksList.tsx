import { FC } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import { FaChevronRight } from "../../../../icons/icons";
import { AssigneeList } from "../AssigneeList/AssigneeList";

export const TasksList: FC = () => {
  const { tasks } = useAppSelector((state: RootState) => state.tasks);

  return (
    <>
      {/* {tasks.map(
        ({
          id,
          name,
          color,
        }: {
          id: number;
          name: string;
          color: string;
        }) => {
          return (
            <tr key={id}>
              <th className="pl-6 text-gray-600 font-normal border-t border-b py-2">
                <div className="flex items-center">
                  <FaChevronRight />
                  <div
                    className="w-2.5 h-2.5 border ml-2 rounded-sm"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="pl-2">{name}</span>
                </div>
              </th>
              <th className="border-b">
                <AssigneeList taskId={id} />
              </th>
            </tr>
          );
        }
      )} */}
    </>
  );
};
