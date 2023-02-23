import { FC, SetStateAction, useState } from "react";

export const AutoResizeTextarea: FC = () => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: {
    target: {
      value: SetStateAction<string>;
      style: { height: string };
      scrollHeight: any;
    };
  }) => {
    setValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  return (
    <textarea
      onChange={handleChange}
      value={value}
      maxLength={500}
      className="w-full overflow-hidden resize-none focus:outline-none border border-gray-100 rounded py-3 px-4"
      placeholder="Write your thoughts here..."
    ></textarea>
  );
};
