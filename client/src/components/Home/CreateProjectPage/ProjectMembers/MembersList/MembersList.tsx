import { FC, RefObject } from "react";
import { FaRemoveButton } from "../../../../icons/icons";

interface IProps {
  setMembers: Function;
  setMember: Function;
  inputRef: RefObject<HTMLInputElement>;
  member: string;
  members: string[];
}

export const MembersList: FC<IProps> = ({
  setMembers,
  setMember,
  inputRef,
  members,
}) => {
  const handleRemoveMember = (member: string) => {
    setMembers((prevArray: string[]) =>
      prevArray.filter((item: string) => item !== member)
    );
    if (inputRef.current) inputRef.current.value = "";
    setMember("");
  };

  return (
    <>
      {members.map((member: string) => {
        return (
          <div
            key={member}
            className="flex items-center mt-2 rounded mr-2 bg-gray-50 px-2 py-1.5"
          >
            <span className="font-normal text-xs">{member}</span>

            <button onClick={() => handleRemoveMember(member)} className="pl-2">
              <FaRemoveButton />
            </button>
          </div>
        );
      })}
    </>
  );
};
