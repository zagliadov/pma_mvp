import { FC, useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import { AssigneeModal } from "./AssigneeModal/AssigneeModal";
import { AssigneeList } from "./AssigneeList/AssigneeList";
import { useParams } from "react-router-dom";
import { setTask } from "../../../../redux/tasksSlice/tasksSlice";
import {
  toggleIsBlockingTasksModalOpen,
  toggleIsCreateTaskModal,
} from "../../../../redux/diffSlice/diffSlice";
import { BlockingTaskButton } from "./BlockingTaskButton/BlockingTaskButton";
import { BlockingTasksModal } from "./BlockingTasksModal/BlockingTasksModal";

export interface IArrTaskAssignee {
  id: number;
  email: string;
}

export const CreateTaskModal: FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [createStatusModalOpen, setCreateStatusModalOpen] =
    useState<boolean>(false);
  const [createEditStatusModalOpen, setCreateEditStatusModalOpen] =
    useState<boolean>(false);
  const isAssigneeModalOpen: boolean = useAppSelector(
    (state: RootState) => state.diff.isAssigneeModalOpen
  );
  const isBlockingTasksModalOpen: boolean = useAppSelector(
    (state: RootState) => state.diff.isBlockingTasksModalOpen
  );
  const isStatusModalOpen: boolean = useAppSelector(
    (state: RootState) => state.diff.isStatusModalOpen
  );
  const [taskName, setTaskName] = useState<string>("");
  const [statusColor, setStatusColor] = useState<string>("#7ec770");
  const [taskBlocker, setTaskBlocker] = useState<number[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [subTasks, setSubTasks] = useState<string[]>([]);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskAssignee, setTaskAssignee] = useState<IArrTaskAssignee[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const truncatedAssignee =
    taskAssignee.length > 3 ? taskAssignee.slice(0, 3) : taskAssignee;

  const handleEditStatus = (id: number) => {
    setCreateEditStatusModalOpen(true);
    setCreateStatusModalOpen(false);
    setEditId(id);
  };

  useEffect(() => {
    if (status !== "Blocked") {
      setTaskBlocker([]);
      dispatch(toggleIsBlockingTasksModalOpen(false));
    }
  }, [dispatch, status]);

  const handleCloseModal = () => {
    dispatch(toggleIsCreateTaskModal(false));
  };

  const CreateTask = () => {
    if (!taskName.length || !taskDescription.length || !color || !status)
      return;
    dispatch(
      setTask({
        project_id: Number(params.project_id),
        taskName,
        taskDescription,
        color,
        status,
        subTasks,
        taskAssignee,
        taskBlocker,
      })
    );
    dispatch(toggleIsCreateTaskModal(false));
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="relative w-[70%] bg-white rounded-lg shadow-lg border border-gray-50">
        <div className="border-b border-gray-50 flex justify-between items-center h-14">
          <span className="pl-4 text-lg font-medium">Create task</span>
          <div className="pr-5">
            <CloseModalCreateTask />
          </div>
        </div>

        <div className="py-8 px-8">
          <TaskName setTaskName={setTaskName} />
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center">
              <StatusButton
                status={status}
                color={color}
                setCreateStatusModalOpen={setCreateStatusModalOpen}
                setCreateEditStatusModalOpen={setCreateEditStatusModalOpen}
              />
              <span className="border h-4"></span>
              {taskAssignee.length > 0 ? (
                <AssigneeList
                  truncatedAssignee={truncatedAssignee}
                  taskAssignee={taskAssignee}
                />
              ) : (
                <AssigneeButton />
              )}
            </div>
            {status === "Blocked" && <BlockingTaskButton />}
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
          <button
            className="py-2.5 px-6 text-base text-gray-600 font-medium"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            onClick={() => CreateTask()}
            className="bg-primary-500 rounded py-2.5 px-6 text-white text-base font-medium"
          >
            Create
          </button>
        </div>

        {isStatusModalOpen && (
          <StatusModal
            setColor={setColor}
            setStatus={setStatus}
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
          <AssigneeModal setTaskAssignee={setTaskAssignee} />
        )}
        {isBlockingTasksModalOpen && (
          <BlockingTasksModal
            setTaskBlocker={setTaskBlocker}
            taskBlocker={taskBlocker}
          />
        )}
      </div>
    </div>
  );
};
