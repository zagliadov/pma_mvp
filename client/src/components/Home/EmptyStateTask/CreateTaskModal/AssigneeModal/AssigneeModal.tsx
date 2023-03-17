import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  IProjectMembers,
  getProjectMembers,
} from "../../../../../redux/projectSlice/projectSlice";
import { RootState } from "../../../../../redux/store";
import { FaCloseButton, FaRemoveButton } from "../../../../icons/icons";
import { toggleIsAssigneeModalOpen } from "../../../../../redux/diffSlice/diffSlice";

interface IProps {
  setTaskAssignee: Function;
}
export const AssigneeModal: FC<IProps> = ({ setTaskAssignee }) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const token: string | null = localStorage.getItem("token");
  const projectMembers = useAppSelector(
    (state: RootState) => state.project.projectMembers
  );
  const handleCloseModal = () => {
    dispatch(toggleIsAssigneeModalOpen(false));
  };
  useEffect(() => {
    if (!token) return;
    dispatch(
      getProjectMembers({ project_id: Number(params.project_id), token })
    );
  }, [dispatch, params.project_id, token]);

  const handleAddAssignee = (id: number, email: string) => {
    setTaskAssignee((prevState: { id: number; email: string }[]) => {
      const isDuplicate = prevState.some(
        (assignee: { id: number; email: string }) => assignee.id === id
      );
      if (isDuplicate) {
        return prevState;
      } else {
        const newState = [...prevState, { id, email }];
        return newState;
      }
    });
  };

  const handleRemoveAssignee = (id: number) => {
    setTaskAssignee((prevState: { id: number; email: string }[]) => {
      const newState = prevState.filter(
        (item: { id: number; email: string }) => {
          return item.id !== id;
        }
      );
      return newState;
    });
  };

  return (
    <div className="absolute z-[111] flex flex-col bg-white shadow-md top-[60px] left-[300px] w-[320px] h-[480px] border">
      <div className="flex justify-end" onClick={() => handleCloseModal()}>
        <FaCloseButton />
      </div>
      <div className="px-4 py-4">
        {projectMembers &&
          projectMembers.map((member: IProjectMembers) => {
            return (
              <div
                className="flex items-center justify-between p-1"
                key={member.id}
              >
                <div className="flex items-center">
                  <div className="border flex items-center justify-center w-8 h-8 rounded-full">
                    <span>{member.email.charAt(0)}</span>
                  </div>
                  <button
                    key={member.id}
                    className="py-1 px-2"
                    onClick={() => handleAddAssignee(member.id, member.email)}
                  >
                    <span>{member.email}</span>
                  </button>
                </div>

                <button
                  className="flex"
                  onClick={() => handleRemoveAssignee(member.id)}
                >
                  <FaRemoveButton />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
