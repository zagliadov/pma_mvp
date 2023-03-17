import { FC } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";

export const SubtasksList: FC = () => {
  const subtasks = useAppSelector(
    (state: RootState) => state.subtasks.subtasks
  );
  return (
    <>
      <div className="text-gray-600 font-normal desktop:basis-9/12 basis-6/12 border">
        {subtasks &&
          subtasks.map((subtask: any) => {
            return (
              <div className="flex items-center border-b border-x" key={subtask.id}>
                <div className="flex items-center py-2">
                  <div className="pl-1">
                    <input type="checkbox" />
                  </div>
                  <div className="pl-8"></div>
                  <div className="pl-2">
                    <div
                      className="w-2.5 h-2.5 rounded-sm mt-0.5"
                      style={{ backgroundColor: subtask.color }}
                    ></div>
                  </div>
                  <div className="pl-1.5">
                    <span className="font-normal text-sm">{subtask.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
      <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
      <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
      <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
      <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
      <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
      <div className="flex justify-center items-center desktop:basis-1/12 basis-2/12 border"></div>
    </>
  );
};
