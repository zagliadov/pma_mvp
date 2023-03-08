import { FC, useState } from "react";
import { FaCreateTask } from "../../icons/icons";
import { AppCreateTaskButton } from "./AppCreateTaskButton/AppCreateTaskButton";
import { CreateTaskModal } from "./CreateTaskModal/CreateTaskModal";

export const EmptyStateTask: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {isModalOpen ? (
        <CreateTaskModal setIsModalOpen={setIsModalOpen} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col justify-center items-center">
            <FaCreateTask />
            <span className="font-medium text-2xl pt-4 text-gray-900">
              Create task
            </span>
            <p className="text-base font-normal pt-4 text-gray-600">
              This Project is empty. Create a Task to get started.
            </p>
          </div>
          <div className="pt-4">
            <AppCreateTaskButton setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
};
