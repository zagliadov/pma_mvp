import { FC } from "react";

interface IProps {
  setProjectName: Function;
};

export const ProjectName: FC<IProps> = ({ setProjectName }) => {
  return (
    <input
      onChange={(e) => setProjectName(e.target.value)}
      className="w-full focus:outline-none border border-gray-100 rounded py-3 px-4"
      type="text"
      placeholder="Project name"
    />
  );
};
