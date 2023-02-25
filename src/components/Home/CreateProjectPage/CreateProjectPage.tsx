import { FC, useState } from "react";
import { AppCloseButton } from "../../ButtonComponents/AppCloseButton/AppCloseButton";
import { AutoResizeTextarea } from "./AutoResizeTextarea/AutoResizeTextarea";
import { ProjectMembers } from "./ProjectMembers/ProjectMembers";
import { ProjectName } from "./ProjectName/ProjectName";
import { ProjectTasks } from "./ProjectTasks/ProjectTasks";

export const CreateProjectPage: FC = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const [projectDescription, setProjectDescription] = useState<string>("");

  const handleClick = () => {
    console.log(projectName, "projectName");
    console.log(members, "members");
    console.log(projectDescription, "projectDescription");
  };

  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-150">
      <div className="w-[70%] bg-white rounded-lg">
        <div className="border-b border-gray-50 flex justify-between items-center h-14">
          <span className="pl-4 text-lg font-medium">Create project</span>
          <div className="pr-5">
            <AppCloseButton />
          </div>
        </div>

        <div className="pt-8 px-8">
          <ProjectName setProjectName={setProjectName} />
          <div className="pt-4">
            <ProjectMembers members={members} setMembers={setMembers} />
          </div>
          <div className="pt-4">
            <AutoResizeTextarea
              setProjectDescription={setProjectDescription}
              projectDescription={projectDescription}
            />
          </div>

          <div className="pt-4">
            <ProjectTasks />
          </div>
        </div>
      </div>
    </div>
  );
};
