import {
  ChangeEvent,
  FC,
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
} from "react";

export const ProjectMembers: FC = () => {
  const [member, setMember] = useState("");
  const [members, setMembers] = useState<any>([]);
  const [isValid, setIsValid] = useState(false);
  const ref = useRef<any>();

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isEmailValid(e.target.value)) {
      setMember(e.target.value);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleAddMembers = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      ref.current.value = "";
      if (member.length > 0) {
        setMembers((oldMembers: any) => [...oldMembers, member]);
        setIsValid(false);
      }
    }
  };

  const handleRemoveMember = (member: any) => {
    const index = members.findIndex((element: any) => element === member);
    if (index !== -1) {
      const newArray = [...members];
      newArray.splice(index, 1);
      ref.current.value = "";
      setMember("");
      setIsValid(false);
      setMembers(newArray);
    }
  };

  useEffect(() => {
    console.log(members);
  }, [members]);

  return (
    <>
      <div className="w-full h-28 overflow-hidden border border-gray-100 rounded py-3 px-4">
        <div className="flex items-center">
          {members.map((member: any) => {
            return (
              <span
                key={member}
                className="rounded ml-2 bg-gray-50 px-1.5 py-2"
              >
                {member}
                <button
                  onClick={() => handleRemoveMember(member)}
                  className="px-2"
                >
                  x
                </button>
              </span>
            );
          })}

          <input
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleAddMembers(e)}
            placeholder="Press enter to add member..."
            type="text"
            ref={ref}
            className="w-[30%] ml-2 focus:outline-none border border-gray-50 rounded py-1 px-1"
          />
          {/* {isValid ? (
            <button
              onClick={() => handleAddMembers()}
              className="flex items-center justify-center w-6"
            >
              +
            </button>
          ) : null} */}
        </div>
      </div>

      {/* <textarea
        ref={ref}
        onChange={(e) => handleClick(e)}
        className="relative w-full overflow-hidden resize-none focus:outline-none border border-gray-100 rounded py-3 px-4"
      />
      <div>
        <div className="">
          {members.map((member: any) => {
            return (
              <span
                key={member}
                className="rounded ml-2 bg-gray-50 px-1.5 py-2"
              >
                {member}
                  <button
                    onClick={() => handleRemoveMember(member)}
                    className="px-2"
                  >
                    x
                  </button>
              </span>
            );
          })}
        </div>
      </div>
      {isValid ? (
        <button onClick={() => handleAddMembers()} className="flex items-center justify-center w-6 h-6 border rounded-lg">
          +
        </button>
      ) : null} */}
    </>
  );
};
