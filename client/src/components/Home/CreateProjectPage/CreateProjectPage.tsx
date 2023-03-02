import { FC, useState } from "react";
import { AppCloseButton } from "../../ButtonComponents/AppCloseButton/AppCloseButton";
import { AutoResizeTextarea } from "./AutoResizeTextarea/AutoResizeTextarea";
import { ProjectMembers } from "./ProjectMembers/ProjectMembers";
import { ProjectName } from "./ProjectName/ProjectName";
import { ProjectTasks } from "./ProjectTasks/ProjectTasks";
import { ProjectDialogWithCancelCreate } from "./ProjectDialogWithCancelCreate/ProjectDialogWithCancelCreate";

export const CreateProjectPage: FC = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);

  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-200 py-4">
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
            <ProjectTasks setTasks={setTasks} tasks={tasks} />
          </div>
        </div>

        <div className="border-t border-gray-10 flex justify-end pr-4 py-2">
          <ProjectDialogWithCancelCreate
            projectName={projectName}
            members={members}
            projectDescription={projectDescription}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  );
};
