import { FC } from "react";
import { FaHelpCircle } from "../../../icons/icons";
import { Link } from "react-router-dom";

export const AppHelpButton: FC = () => {
  return (
    <Link to="/user_settings/information">
      <FaHelpCircle />
    </Link>
  );
};
