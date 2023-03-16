import { FC } from "react";
import { ProfilePhoto } from "./ProfilePhoto/ProfilePhoto";
import { PersonalInformation } from "./PersonalInformation/PersonalInformation";
import { LanguageRegionSettings } from "./LanguageRegionSettings/LanguageRegionSettings";

export const MySettings: FC = () => {
  return (
    <div className="w-full pr-8">
      <div>
        <h3 className="text-2xl font-medium">My Settings</h3>
      </div>
      <div className="flex flex-col">
        <ProfilePhoto />
        <PersonalInformation />
        <LanguageRegionSettings />
      </div>
    </div>
  );
};
