import { FC, SetStateAction } from "react";

interface IProps {
  setTaskDescription: Function;
  taskDescription: string;
}

export const CreateTaskDescription: FC<IProps> = ({
  setTaskDescription,
  taskDescription,
}) => {
  const handleChange = (e: {
    target: {
      value: SetStateAction<string>;
      style: { height: string };
      scrollHeight: any;
    };
  }) => {
    setTaskDescription(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  return (
    <textarea
      onChange={handleChange}
      value={taskDescription}
      maxLength={500}
      className="w-full overflow-hidden resize-none focus:outline-none border border-gray-100 rounded py-3 px-4"
      placeholder="Enter description..."
    ></textarea>
  );
};