import { FC, useState, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "../../../icons/icons";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import {
  setUserLanguage,
  setUserTimezone,
} from "../../../../redux/userSettingsSlice/userSettingsSlice";

export const LanguageRegionSettings: FC = () => {
  const dispatch = useAppDispatch();
  const userLanguage = useAppSelector(
    (state: RootState) => state.user.userLanguage
  );
  const userTimezone = useAppSelector(
    (state: RootState) => state.user.userTimezone
  );
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] =
    useState<boolean>(false);
  const [isTimezoneDropdownOpen, setIsTimezoneDropdownOpen] =
    useState<boolean>(false);
  const handleIsLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };
  const handleIsTimezoneDropdown = () => {
    setIsTimezoneDropdownOpen(!isTimezoneDropdownOpen);
  };
  const languageDropdownRef = useRef<any>(null);
  const timezoneDropdownRef = useRef<any>(null);
  useClickOutside(languageDropdownRef, () => setIsLanguageDropdownOpen(false));
  useClickOutside(timezoneDropdownRef, () => setIsTimezoneDropdownOpen(false));
  const handleSetLanguage = (language: string) => {
    dispatch(setUserLanguage(language));
  };

  const handleSetTimezone = (timezone: string) => {
    dispatch(setUserTimezone(timezone));
  };

  return (
    <div className="border-t border-gray-50 pt-8">
      <div>
        <span className="font-medium text-base">
          Language & Region settings
        </span>
      </div>
      <div className="flex pr-8 pt-6">
        <div className="flex flex-col w-2/4 pr-4">
          <div className="pb-1">
            <span className="pt-6 text-xs font-normal text-gray-600">
              Language
            </span>
          </div>

          {/* Language dropdown */}
          <div ref={languageDropdownRef}>
            <button
              onClick={handleIsLanguageDropdown}
              className="flex justify-between w-full items-center border border-gray-100 rounded px-4 py-3"
            >
              <span className="text-xs font-normal text-gray-600">
                {userLanguage}
              </span>
              {isLanguageDropdownOpen ? <FaChevronDown /> : <FaChevronUp />}
            </button>
            {isLanguageDropdownOpen && (
              <div className="border flex flex-col items-start border-gray-100 rounded">
                <button
                  className="hover:bg-gray-50 w-full text-start px-4 py-2"
                  onClick={() => handleSetLanguage("English")}
                >
                  <span className="text-xs font-normal text-gray-600">
                    English
                  </span>
                </button>
                <button
                  className="hover:bg-gray-50 w-full text-start px-4 py-2"
                  onClick={() => handleSetLanguage("Spanish")}
                >
                  <span className="text-xs font-normal text-gray-600">
                    Spanish
                  </span>
                </button>
                <button
                  className="hover:bg-gray-50 w-full text-start px-4 py-2"
                  onClick={() => handleSetLanguage("French")}
                >
                  <span className="text-xs font-normal text-gray-600">
                    French
                  </span>
                </button>
                <button
                  className="hover:bg-gray-50 w-full text-start px-4 py-2"
                  onClick={() => handleSetLanguage("Chinese")}
                >
                  <span className="text-xs font-normal text-gray-600">
                    Chinese
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-2/4 pl-4">
          {/* Timezone dropdown */}
          <div className="pb-1">
            <span className="pt-6 text-xs font-normal text-gray-600">
              Timezone
            </span>
          </div>
          <div ref={timezoneDropdownRef}>
            <button
              onClick={handleIsTimezoneDropdown}
              className="flex justify-between w-full items-center border border-gray-100 rounded px-4 py-3"
            >
              <span className="text-xs font-normal text-gray-600">
                {userTimezone}
              </span>
              {isTimezoneDropdownOpen ? <FaChevronDown /> : <FaChevronUp />}
            </button>
            {isTimezoneDropdownOpen && (
              <div className="border flex flex-col items-start border-gray-100 rounded">
                <button
                  className="hover:bg-gray-50 w-full text-start px-4 py-2"
                  onClick={() => handleSetTimezone("EST")}
                >
                  <span className="text-xs font-normal text-gray-600">EST</span>
                </button>
                <button
                  className="hover:bg-gray-50 w-full text-start px-4 py-2"
                  onClick={() => handleSetTimezone("CET")}
                >
                  <span className="text-xs font-normal text-gray-600">CET</span>
                </button>
                <button
                  className="hover:bg-gray-50 w-full text-start px-4 py-2"
                  onClick={() => handleSetTimezone("IST")}
                >
                  <span className="text-xs font-normal text-gray-600">IST</span>
                </button>
                <button
                  className="hover:bg-gray-50 w-full text-start px-4 py-2"
                  onClick={() => handleSetTimezone("JST")}
                >
                  <span className="text-xs font-normal text-gray-600">JST</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
