import { FC } from "react";
import { ProfilePhoto } from "./ProfilePhoto/ProfilePhoto";


export const MySettings: FC = () => {

  return (
    <div>
      <div>
        <h3 className="text-2xl font-medium">My Settings</h3>
      </div>
      <ProfilePhoto />
    </div>
  );
};
