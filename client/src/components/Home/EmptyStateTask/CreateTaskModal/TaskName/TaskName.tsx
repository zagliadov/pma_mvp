import { FC } from "react";

interface IProps {
  setTaskName: Function;
};

export const TaskName: FC<IProps> = ({ setTaskName }) => {

  return (
    <input
      onChange={(e) => setTaskName(e.target.value)}
      className="w-full focus:outline-none border border-gray-100 rounded py-3 px-4"
      type="text"
      placeholder="Task name..."
    />
  );
};
