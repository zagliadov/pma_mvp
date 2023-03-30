import { FC } from "react";
import { FaSettings } from "../../../icons/icons";
import { Link } from "react-router-dom";

export const AppSettingsButton: FC = () => {
  return (
    <Link to="/user_settings/projects">
      <FaSettings />
    </Link>
  );
};
