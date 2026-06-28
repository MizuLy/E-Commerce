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
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        <input
          type="search"
          placeholder="Search..."
          className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs px-3 py-1.5 rounded outline-none placeholder-zinc-500"
        />
      </div>

      <button
        onClick={toggleSearch}
        className="text-zinc-400 hover:text-white transition-colors duration-200 focus:outline-none flex items-center justify-center"
      >
        {isOpen ? <LuX size={18} /> : <LuSearch size={18} />}
      </button>
    </div>
  );
}
