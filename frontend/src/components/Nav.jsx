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
    <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-950/90 border-b border-zinc-800 backdrop-blur-md text-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
        {/* Left: Logo & Links */}
        <div className="flex items-center gap-16">
          <HashLink to="/#home" className="h-12 w-auto flex items-center">
            <img
              src={logo}
              alt="logo"
              className="h-full w-auto object-contain brightness-0 invert"
            />
          </HashLink>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 text-xs tracking-widest font-light text-zinc-400">
            {navLink.map((link) => (
              <li
                key={link.name}
                className="hover:text-white transition-colors duration-200"
              >
                <HashLink smooth to={link.to}>
                  {link.name}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-6 text-zinc-400 [&_button]:hover:text-white [&_button]:transition-colors">
          <SearchBtn />
          <LoginBtn />
          <CartBtn />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <CartBtn />
          <button
            onClick={toggleMenu}
            className="text-zinc-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <LuX size={22} /> : <LuAlignRight size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-20 left-0 w-full bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-lg transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col px-8 py-6 gap-6 text-sm tracking-widest font-light">
          <li className="mb-2">
            <input
              type="search"
              placeholder="Search..."
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 rounded px-4 py-2 text-xs focus:outline-none focus:border-zinc-700"
            />
          </li>
          {navLink.map((link) => (
            <li
              key={link.name}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <HashLink smooth to={link.to} onClick={() => setIsOpen(false)}>
                {link.name}
              </HashLink>
            </li>
          ))}
          <li className="pt-4 border-t border-zinc-800 flex gap-6 text-zinc-400">
            <LoginBtn />
          </li>
        </ul>
      </div>
    </nav>
  );
}
