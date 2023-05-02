import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { EmptyStateTask } from "../EmptyStateTask/EmptyStateTask";
import { useParams } from "react-router-dom";
import { getTasks } from "../../../redux/tasksSlice/tasksSlice";
import { CreateTaskModal } from "../EmptyStateTask/CreateTaskModal/CreateTaskModal";
import { Table } from "./Table/Table";
import { getProject } from "../../../redux/projectSlice/projectSlice";
import { FilterSidebar } from './FilterSidebar/FilterSidebar';

export const MainTable: FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isCreateTaskModal = useAppSelector(
    (state: RootState) => state.diff.isCreateTaskModal
  );
  const { isFilterSidebarOpen } = useAppSelector(
    (state: RootState) => state.diff
  );
  const toggleIsActiveSidebar = useAppSelector(
    (state: RootState) => state.diff.isActiveSidebar
  );
  const isEmptyStateTask = useAppSelector(
    (state: RootState) => state.tasks.isEmptyStateTask
  );
  const shutdownEffect = toggleIsActiveSidebar;

  useEffect(() => {
    const projectId = Number(params.project_id);
    dispatch(getProject(projectId));
    dispatch(getTasks(projectId));
  }, [dispatch, params.project_id]);

  return (
    <div
      className={`w-full h-full bg-gray-10 border px-4 relative py-4 ${
        shutdownEffect ? "blur-[2px] border-gray-300" : "bg-gray-10"
      }`}
    >
      {isFilterSidebarOpen && (
        <FilterSidebar />
      )}

      {/* {isEmptyStateProject && <EmptyStateProject />} */}
      {isEmptyStateTask && !isCreateTaskModal && <EmptyStateTask />}
      {isCreateTaskModal && <CreateTaskModal />}
      {!isCreateTaskModal && !isEmptyStateTask && <Table />}
    </div>
  );
};
