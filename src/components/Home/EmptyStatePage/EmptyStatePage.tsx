import { FC } from "react";
import { AppCreateProjectButton } from "../../ButtonComponents/AppCreateProjectButton/AppCreateProjectButton";

export const EmptyStatePage: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
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
