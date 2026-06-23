import { useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";

export default function SearchBtn() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex items-center gap-2">
      <div
        className={`absolute right-8 transition-all duration-300 ${
          isOpen ? "w-48 opacity-100" : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        <input
          type="search"
          placeholder="Search..."
          className="w-full p-2 border outline-none"
        />
      </div>
      <button onClick={toggleSearch}>
        {isOpen ? <LuX size={24} /> : <LuSearch size={24} />}
      </button>
    </div>
  );
}
