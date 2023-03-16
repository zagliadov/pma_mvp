import { FC } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  setUserFirstname,
  setUserLastname,
  setUserEmail,
  setUserPhone,
} from "../../../../redux/userSettingsSlice/userSettingsSlice";

export const PersonalInformation: FC = () => {
  const dispatch = useAppDispatch();

  const handleChangePhoneNumber = (e: any) => {
    const input = e.target.value.replace(/\D/g, "");
    const formattedInput = input.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    const additionalCleaning = formattedInput.replace(/\D/g, "");

    dispatch(setUserPhone(additionalCleaning));
  };

  return (
    <div className="border-t border-gray-50 pt-8 pb-8">
      <div>
        <span className="font-medium text-base">Personal information</span>
      </div>
      <div className="flex pt-6">
        <div className="flex flex-col w-2/4 pr-8">
          <label
            htmlFor="firstname"
            className="pb-1 text-xs font-normal text-gray-600"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            placeholder="Enter your first name..."
            onChange={(e) => dispatch(setUserFirstname(e.target.value))}
            className="border border-gray-100 rounded px-4 py-2"
          />

          <label
            htmlFor="email"
            className="pt-6 pb-1 text-xs font-normal text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address..."
            onChange={(e) => dispatch(setUserEmail(e.target.value))}
            className="border border-gray-100 rounded px-4 py-2"
          />
        </div>
        <div className="flex flex-col w-2/4 pr-8">
          <label
            htmlFor="lastname"
            className="pb-1 text-xs font-normal text-gray-600"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            placeholder="Enter your last name..."
            onChange={(e) => dispatch(setUserLastname(e.target.value))}
            className="border border-gray-100 rounded px-4 py-2"
          />

          <label
            htmlFor="phone"
            className="pt-6 pb-1 text-xs font-normal text-gray-600"
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number..."
            onChange={(e) => handleChangePhoneNumber(e)}
            className="border border-gray-100 rounded px-4 py-2"
          />
        </div>
      </div>
    </div>
  );
};
