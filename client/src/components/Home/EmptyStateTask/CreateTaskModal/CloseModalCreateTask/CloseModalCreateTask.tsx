import { FC } from "react";
import { FaCloseButton } from "../../../../icons/icons";
import { useAppDispatch } from "../../../../../redux/hooks";
import { toggleIsCreateTaskModal } from "../../../../../redux/diffSlice/diffSlice";

export const CloseModalCreateTask: FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(toggleIsCreateTaskModal(false));
  };

  return (
    <button onClick={() => handleClick()}>
      <FaCloseButton />
    </button>
  );
};
