import { FC, SetStateAction } from "react";

interface IProps {
  setProjectDescription: Function;
  projectDescription: string;
}

export const AutoResizeTextarea: FC<IProps> = ({
  setProjectDescription,
  projectDescription,
}) => {
  const handleChange = (e: {
    target: {
      value: SetStateAction<string>;
      style: { height: string };
      scrollHeight: any;
    };
  }) => {
    setProjectDescription(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  return (
    <textarea
      onChange={handleChange}
      value={projectDescription}
      maxLength={500}
      className="w-full overflow-hidden resize-none focus:outline-none border border-gray-100 rounded py-3 px-4"
      placeholder="Enter description..."
    ></textarea>
  );
};
