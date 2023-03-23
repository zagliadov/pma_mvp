import { FC, useEffect } from "react";
import { AppCreateProjectButton } from "../../ButtonComponents/AppCreateProjectButton/AppCreateProjectButton";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

export const EmptyStateProject: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEmptyStateProject = useAppSelector(
    (state: RootState) => state.project.isEmptyStateProject
  );
  const isEmptyStateTask = useAppSelector(
    (state: RootState) => state.project.isEmptyStateTask
  );

  // useEffect(() => {
  //   if (!isEmptyStateProject) navigate("/main_table");
  //   if (!isEmptyStateProject && !isEmptyStateTask) navigate("/");
  // }, [dispatch, isEmptyStateProject, isEmptyStateTask, navigate]);

  return (
    <div className={`flex flex-col justify-center items-center h-full`}>
      <div className="w-32 h-28 bg-[url('assets/CProject.svg')]"></div>
      <div className="flex flex-col justify-center items-center w-[460px] pt-8 pb-4">
        <p className="text-2xl font-medium text-gray-900 pb-4">
          Create project
        </p>
        <p className="font-normal text-base text-gray-600 text-center leading-6 tracking-wide">
          Create your first project. Create tasks and subtasks. Mark who will
          perform the task and when. View tasks in table or timeline mode
        </p>
      </div>

      <AppCreateProjectButton />
    </div>
  );
};
