import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

export const AppCloseButton: FC = () => {
  const navigate = useNavigate();
  const isEmptyState = useAppSelector(
    (state: RootState) => state.project.isEmptyState
  );
  const handleClick = () => {
    if (isEmptyState) {
      navigate("/empty_state");
    } else {
      navigate("/");
    }
  };

  return (
    <button onClick={() => handleClick()}>
      <svg
        width="40"
        height="41"
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.7071 13.7929C27.0976 14.1834 27.0976 14.8166 26.7071 15.2071L14.7071 27.2071C14.3166 27.5976 13.6834 27.5976 13.2929 27.2071C12.9024 26.8166 12.9024 26.1834 13.2929 25.7929L25.2929 13.7929C25.6834 13.4024 26.3166 13.4024 26.7071 13.7929Z"
          fill="#8E9491"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2929 13.7929C13.6834 13.4024 14.3166 13.4024 14.7071 13.7929L26.7071 25.7929C27.0976 26.1834 27.0976 26.8166 26.7071 27.2071C26.3166 27.5976 25.6834 27.5976 25.2929 27.2071L13.2929 15.2071C12.9024 14.8166 12.9024 14.1834 13.2929 13.7929Z"
          fill="#8E9491"
        />
      </svg>
    </button>
  );
};
