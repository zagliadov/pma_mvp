import { FC, useState, useRef } from "react";
import { FaSearch } from "../../icons/icons";

export const SearchInput: FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const inputRef = useRef<any>(null);

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="flex w-full justify-end items-center relative" ref={inputRef}>
      <button
        type="submit"
        disabled
        className={`px-2.5 z-10 mr-[-35px] focus:outline-none focus:shadow-outline`}
      >
        <FaSearch />
      </button>
      <input
        onChange={(e) => handleChange(e)}
        type="search"
        className={`py-2 border border-gray-100 focus:w-full text-gray-600 text-sm rounded pl-8 focus:outline-none`}
        placeholder="Search..."
      />
    </div>
  );
};
