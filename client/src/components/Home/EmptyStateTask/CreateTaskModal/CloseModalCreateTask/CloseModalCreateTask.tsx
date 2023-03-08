import { FC } from "react";
import { FaCloseButton } from "../../../../icons/icons";

interface IProps {
  setIsModalOpen: Function;
}
export const CloseModalCreateTask: FC<IProps> = ({ setIsModalOpen }) => {

  const handleClick = () => {
    setIsModalOpen(false);
  };

  return (
    <button onClick={() => handleClick()}>
      <FaCloseButton />
    </button>
  );
};