import { FC, useEffect } from "react";
import { FaCloseButton } from "../../../../icons/icons";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { toggleIsBlockingTasksModalOpen } from "../../../../../redux/diffSlice/diffSlice";
import { getTasks } from "../../../../../redux/tasksSlice/tasksSlice";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../../redux/store";

interface IProps {
  setTaskBlocker: (arg0: any) => void;
  taskBlocker: number[];
}
export const BlockingTasksModal: FC<IProps> = ({
  setTaskBlocker,
  taskBlocker,
}) => {
  const params = useParams();
  const token: string | null = localStorage.getItem("token");
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(toggleIsBlockingTasksModalOpen(false));
    if (!token) return;
    dispatch(getTasks({ project_id: Number(params.project_id), token }));
  };

  const handleAddBlocker = (taskId: number) => {
    setTaskBlocker((prevState: number[]) => {
      const isDuplicate = prevState.some((id: number) => id === taskId);
      if (isDuplicate) {
        return prevState.filter((id: number) => id !== taskId);
      } else {
        const newState = [...prevState, taskId];
        return newState;
      }
    });
  };

  const isBlocker = (taskId: number) => {
    return taskBlocker.includes(taskId);
  };

  return (
    <div className="absolute z-[111] flex flex-col bg-white shadow-md top-[60px] left-[300px] w-[320px] h-[480px] border">
      <div>
        <div className="flex items-center justify-between py-2 border-b">
          <span className="pl-4 text-lg font-medium">Blockers</span>
          <button onClick={handleCloseModal} className="pr-2">
            <FaCloseButton />
          </button>
        </div>
        <div className="p-3">
          <span className="text-xs font-normal">
            Please select a task that, when completed, will unlock the current
            task.
          </span>
        </div>
        <div className="p-2">
          {tasks.map((task: any) => {
            return (
              <div key={task.id} className="p-1">
                <button
                  className={`border rounded w-full ${
                    isBlocker(task.id) && "bg-green-200"
                  }`}
                  onClick={() => handleAddBlocker(task.id)}
                >
                  <span className="text-gray-500">{task.name}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
