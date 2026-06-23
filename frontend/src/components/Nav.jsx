import { useState } from "react";
import CartBtn from "./ui/CartBtn";
import LoginBtn from "./ui/LoginBtn";
import SearchBtn from "./ui/SearchBtn";
import { LuAlignRight, LuX } from "react-icons/lu";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/icons/logobg.png";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLink = [
    { name: "HOME", to: "/#home" },
    { name: "FEATURED", to: "/#featured" },
    { name: "ABOUT", to: "/#about" },
    { name: "SHOP", to: "/#shop" },
  ];
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* PC */}
      <div className="hidden md:flex justify-between items-center w-full h-[90px] px-20 mx-auto bg-white/60 backdrop-blur-sm">
        <div className="w-[30%] flex justify-between items-center ">
          <div className="w-[90px] h-full overflow-hidden">
            <img src={logo} alt="logo" className="w-full h-full " />
          </div>

          <div className="w-[60%]">
            <ul className="w-full flex justify-evenly items-center gap-2">
              {navLink.map((link) => (
                <li
                  key={link.name}
                  className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
                >
                  <HashLink smooth to={link.to}>
                    {link.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-4 relative">
          <SearchBtn />
          <LoginBtn />
          <CartBtn />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex justify-between items-center w-full h-[90px] px-10 mx-auto bg-white/80 backdrop-blur-sm">
        <div className="w-full h-full flex justify-between items-center">
          <div className="w-[90px] h-full overflow-hidden">
            <img src={logo} alt="logo" className="w-full h-full " />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <SearchBtn />
            </div>
            <LoginBtn />
            <CartBtn />
            <button onClick={toggleMenu}>
              {isOpen ? <LuX size={24} /> : <LuAlignRight size={24} />}
            </button>
          </div>
          {/* Menu */}
          <div
            className={`absolute top-[90px] left-0 w-full bg-white/80 backdrop-blur-sm z-[99] transition-all duration-150 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
          >
            <ul className="flex flex-col p-5 gap-4 text-center ">
              <input
                type="search"
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 outline-none"
              />
              {navLink.map((link) => (
                <li
                  key={link.name}
                  className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black after:content-[''] hover:after:w-full after:transition-all after:duration-300 text-3xl py-4"
                >
                  <HashLink smooth to={link.to}>
                    {link.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
