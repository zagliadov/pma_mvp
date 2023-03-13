import { FC, useState } from "react";
import { CloseModalCreateTask } from "./CloseModalCreateTask/CloseModalCreateTask";
import { TaskName } from "./TaskName/TaskName";
import { CreateTaskDescription } from "./CreateTaskDescription/CreateTaskDescription";
import { StatusButton } from "./StatusButton/StatusButton";
import { AssigneeButton } from "./AssigneeButton/AssigneeButton";
import { DropFiles } from "./DropFiles/DropFiles";
import { SubTasks } from "./SubTasks/SubTasks";
import { StatusModal } from "./StatusModal/StatusModal";
import { CreateStatusModal } from "./CreateStatusModal/CreateStatusModal";
import { EditStatusModal } from "./CreateStatusModal/EditStatusModal";
import { useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import { AssigneeModal } from "./AssigneeModal/AssigneeModal";

interface IProps {
  setIsModalOpen: Function;
}

export const CreateTaskModal: FC<IProps> = ({ setIsModalOpen }) => {
  const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);
  const [createStatusModalOpen, setCreateStatusModalOpen] =
    useState<boolean>(false);
  const [createEditStatusModalOpen, setCreateEditStatusModalOpen] =
    useState<boolean>(false);
  const isAssigneeModalOpen = useAppSelector((state: RootState) => state.diff.isAssigneeModalOpen);
  const [taskName, setTaskName] = useState<string>("");
  const [statusColor, setStatusColor] = useState<string>("#7ec770");
  const [status, setStatus] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [subTasks, setSubTasks] = useState<string[]>([]);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleEditStatus = (id: number) => {
    setCreateEditStatusModalOpen(true);
    setCreateStatusModalOpen(false);
    setEditId(id);
  };

  const handleCreate = () => {
    console.log(taskName, taskDescription, color, status)
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full bg-gray-200">
      <div className="relative w-[70%] bg-white rounded-lg">
        <div className="border-b border-gray-50 flex justify-between items-center h-14">
          <span className="pl-4 text-lg font-medium">Create task</span>
          <div className="pr-5">
            <CloseModalCreateTask setIsModalOpen={setIsModalOpen} />
          </div>
        </div>

        <div className="py-8 px-8">
          <TaskName setTaskName={setTaskName} />
          <div className="flex items-center pt-4">
            <StatusButton
              status={status}
              color={color}
              setCreateStatusModalOpen={setCreateStatusModalOpen}
              setCreateEditStatusModalOpen={setCreateEditStatusModalOpen}
              setStatusModalOpen={setStatusModalOpen}
              statusModalOpen={statusModalOpen}
            />
            <span className="border h-4"></span>
            <AssigneeButton />
          </div>
          <div className="pt-4">
            <CreateTaskDescription
              taskDescription={taskDescription}
              setTaskDescription={setTaskDescription}
            />
          </div>
          <DropFiles />
        </div>

        <SubTasks setSubTasks={setSubTasks} subTasks={subTasks} />

        <div className="flex justify-end py-2 px-4">
          <button className="py-2.5 px-6 text-base text-gray-600 font-medium">
            Cancel
          </button>
          <button onClick={() => handleCreate()} className="bg-primary-500 rounded py-2.5 px-6 text-white text-base font-medium">
            Create
          </button>
        </div>

        {statusModalOpen && (
          <StatusModal
            setColor={setColor}
            setStatus={setStatus}
            setStatusModalOpen={setStatusModalOpen}
            createEditStatusModalOpen={createEditStatusModalOpen}
            setCreateEditStatusModalOpen={setCreateEditStatusModalOpen}
            createStatusModalOpen={createStatusModalOpen}
            setCreateStatusModalOpen={setCreateStatusModalOpen}
            handleEditStatus={handleEditStatus}
          />
        )}
        {createStatusModalOpen && (
          <CreateStatusModal
            statusColor={statusColor}
            setStatusColor={setStatusColor}
            setCreateStatusModalOpen={setCreateStatusModalOpen}
          />
        )}
        {createEditStatusModalOpen && (
          <EditStatusModal
            setColor={setColor}
            setStatus={setStatus}
            editId={editId}
            statusColor={statusColor}
            setStatusColor={setStatusColor}
            setCreateEditStatusModalOpen={setCreateEditStatusModalOpen}
          />
        )}
        {isAssigneeModalOpen && (
          <AssigneeModal />
        )}
      </div>
    </div>
  );
};
