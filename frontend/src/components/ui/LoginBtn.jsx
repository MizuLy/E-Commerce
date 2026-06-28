import { LuUserRound } from "react-icons/lu";

export default function LoginBtn() {
  return (
    <button
      className="text-zinc-400 hover:text-white transition-colors duration-200 focus:outline-none flex items-center justify-center"
      aria-label="Account Login"
    >
      <LuUserRound size={18} />
    </button>
  );
}
