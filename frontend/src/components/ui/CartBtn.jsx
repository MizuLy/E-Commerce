import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { LuX } from "react-icons/lu";

export default function CartBtn() {
  const [isCart, setIsCart] = useState(false);

  const toggleCart = () => {
    setIsCart(!isCart);
  };

  return (
    <div className="flex items-center">
      <button onClick={toggleCart}>
        <BiShoppingBag size={24} />
      </button>
      <div>
        <div
          className={`bg-white fixed top-0 left-0 z-[99] shadow-md w-[80%] md:w-[40%] h-[100vh] transition-all duration-150 p-5 ${
            isCart ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            <button onClick={toggleCart}>
              <LuX size={30} />
            </button>
          </div>
          <hr />
          <div className="flex justify-center items-center">
            <h3>No items yet</h3>
          </div>
        </div>
        <div
          className={`bg-black/10 fixed inset-0 z-[98] transition-all duration-150 ${
            isCart ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleCart}
        ></div>
      </div>
    </div>
  );
}
