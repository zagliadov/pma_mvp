import { FC } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { EmptyStateTask } from "../EmptyStateTask/EmptyStateTask";

export const MainTable: FC = () => {
  const isEmptyStateTask = useAppSelector(
    (state: RootState) => state.project.isEmptyStateTask
  );
  return (
    <div>
      <div>{isEmptyStateTask ? <EmptyStateTask /> : <h2>Main Table</h2>}</div>
    </div>
  );
};
