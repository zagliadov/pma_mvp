import { FC } from "react";
import { FaButtonPlus } from "../../icons/icons";
import { useNavigate } from "react-router-dom";
export const AppCreateProjectButton: FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create_project");
  };
  return (
    <button
      onClick={() => handleClick()}
      className="flex justify-center items-center px-7 bg-primary-500 text-white font-medium text-base py-2.5 rounded"
    >
      <FaButtonPlus />
      <span className="pl-2.5">Create Project</span>
    </button>
  );
};
