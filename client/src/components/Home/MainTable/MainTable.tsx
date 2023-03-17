import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { EmptyStateTask } from "../EmptyStateTask/EmptyStateTask";
import { useParams } from "react-router-dom";
import { getTasks } from "../../../redux/tasksSlice/tasksSlice";
import { CreateTaskModal } from "../EmptyStateTask/CreateTaskModal/CreateTaskModal";
import { Table } from "./Table/Table";

export const MainTable: FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isCreateTaskModal = useAppSelector(
    (state: RootState) => state.diff.isCreateTaskModal
  );
  const toggleIsActiveSidebar = useAppSelector(
    (state: RootState) => state.diff.isActiveSidebar
  );
  const isEmptyStateTask = useAppSelector(
    (state: RootState) => state.tasks.isEmptyStateTask
  );
  const shutdownEffect = toggleIsActiveSidebar;

  useEffect(() => {
    const token: string | null = localStorage && localStorage.getItem("token");
    if (!token) return;
    const projectId = Number(params.project_id);
    dispatch(getTasks({ project_id: projectId, token }));
  }, [dispatch, params.project_id]);

  return (
    <div
      className={`w-full h-full border ${
        shutdownEffect ? "bg-gray-150 border-gray-300" : "bg-white"
      }`}
    >
      {isEmptyStateTask && !isCreateTaskModal && <EmptyStateTask />}
      {isCreateTaskModal && <CreateTaskModal />}
      {!isCreateTaskModal && <Table /> }
    </div>
  );
};
