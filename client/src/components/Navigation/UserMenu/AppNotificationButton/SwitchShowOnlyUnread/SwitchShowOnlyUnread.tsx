import { FC, useState } from "react";

interface IProps {
  id: string;
  checked: boolean;
  onChange: Function;
}

export const SwitchShowOnlyUnread: FC<IProps> = ({ id, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange && onChange(newChecked);
  };
  return (
    <div className="flex items-center pl-2">
      <input
        type="checkbox"
        id={id}
        className="hidden"
        checked={isChecked}
        onChange={handleToggle}
      />
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="relative">
          <div className="w-[28px] h-4 bg-gray-100 rounded-full shadow-inner"></div>
          <div
            className={`${
              isChecked ? "bg-primary-500" : "bg-white"
            } absolute left-[2px] top-[2px] w-3 h-3 rounded-[20px] transition-transform transform ${
              isChecked ? "translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};
