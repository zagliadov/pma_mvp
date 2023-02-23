import { FC } from "react";
import { AppCloseButton } from "../../ButtonComponents/AppCloseButton/AppCloseButton";
import { AutoResizeTextarea } from "./AutoResizeTextarea/AutoResizeTextarea";
import { ProjectMembers } from "./ProjectMembers/ProjectMembers";

export const CreateProjectPage: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-150">
      <div className="w-[70%] h-3/6 bg-white rounded-lg">
        <div className="border-b border-gray-50 flex justify-between items-center h-14">
          <span className="pl-4 text-lg font-medium">Create project</span>
          <div className="pr-5">
            <AppCloseButton />
          </div>
        </div>

        <div className="pt-8 px-8">
          <input
            className="w-full focus:outline-none border border-gray-100 rounded py-3 px-4"
            type="text"
            placeholder="Project name"
          />

          <div className="pt-4">
              <ProjectMembers />
          </div>

          <div className="pt-4">
            <AutoResizeTextarea />
          </div>
        </div>
      </div>
    </div>
  );
};
