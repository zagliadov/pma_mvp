import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { IProjectMembers, getProjectMembers } from "../../../../../redux/projectSlice/projectSlice";
import { RootState } from "../../../../../redux/store";

export const AssigneeModal: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const token: string | null = localStorage.getItem("token");
  const projectMembers = useAppSelector((state: RootState) => state.project.projectMembers);

  useEffect(() => {
    if (!token) return;
    dispatch(
      getProjectMembers({ project_id: Number(params.project_id), token })
    );
  }, [dispatch, params.project_id, token]);


  return (
    <div className="absolute z-[111] flex flex-col justify-between bg-white shadow-md top-[60px] left-[300px] w-[320px] h-[480px] border">
      <div>
        {projectMembers && projectMembers.map((member: IProjectMembers) => {
          return (
            <div key={member.id}>
              {member.email}
            </div>
          )
        })}
      </div>
    </div>
  );
};
