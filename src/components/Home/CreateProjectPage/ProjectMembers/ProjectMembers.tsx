import { ChangeEvent, FC, useState, useRef, KeyboardEvent } from "react";
import { isEmailValid, isItemExist } from "../../../../helpers/helpers";
import { MembersList } from "./MembersList/MembersList";

interface IProps {
  members: string[];
  setMembers: Function;
}

export const ProjectMembers: FC<IProps> = ({ members, setMembers }) => {
  const [member, setMember] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isValid = isEmailValid(member) && !isItemExist(member, members);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMember(e.target.value);
  };

  const handleAddMembers = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!isValid) return;
      if (inputRef.current) inputRef.current.value = "";
      setMembers((oldMembers: string[]) => [...oldMembers, member]);
      setMember("");
    }
  };

  return (
    <>
      <div className="w-full h-auto overflow-hidden border border-gray-100 rounded py-3 px-4">
        <div className="flex items-center flex-wrap">
          <MembersList
            setMembers={setMembers}
            setMember={setMember}
            inputRef={inputRef}
            members={members}
            member={""}
          />

          <div className="mt-2 w-[27%]">
            <input
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleAddMembers(e)}
              placeholder="Press enter to add member..."
              type="text"
              ref={inputRef}
              className="focus:outline-none py-1 px-1"
            />
          </div>
        </div>
      </div>
    </>
  );
};
