import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { LuX } from "react-icons/lu";

export default function CartBtn() {
  const [isCart, setIsCart] = useState(false);

  const toggleCart = () => {
    setIsCart(!isCart);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={toggleCart}
        className="text-zinc-400 hover:text-white transition-colors duration-200 focus:outline-none flex items-center relative"
        aria-label="Open Cart"
      >
        <BiShoppingBag size={20} />
        {/* Optional Minimal Badge Counter */}
        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white rounded-full"></span>
      </button>

      {/* Cart Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-[100] w-full sm:w-[450px] h-screen bg-zinc-950/95 border-l border-zinc-900 backdrop-blur-xl transition-transform duration-300 ease-in-out p-8 text-white flex flex-col justify-between ${
          isCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex justify-between items-center pb-6 border-b border-zinc-900">
            <h2 className="text-sm tracking-[0.2em] uppercase font-light">
              Your Cart
            </h2>
            <button
              onClick={toggleCart}
              className="text-zinc-400 hover:text-white transition-colors duration-200 focus:outline-none"
            >
              <LuX size={18} />
            </button>
          </div>

          {/* Cart Items Content Area */}
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-3">
            <p className="text-xs tracking-widest text-zinc-500 uppercase font-light">
              Your bag is empty
            </p>
            <button
              onClick={toggleCart}
              className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase border-b border-zinc-700 pb-0.5 hover:text-white hover:border-white transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Bottom Checkout Section (Keeps layout looking premium even when empty) */}
        <div className="border-t border-zinc-900 pt-6 space-y-4">
          <div className="flex justify-between text-xs tracking-widest font-light text-zinc-400">
            <span>SUBTOTAL</span>
            <span className="text-white">$0.00</span>
          </div>
          <button
            disabled
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 uppercase text-xs tracking-[0.25em] py-4 cursor-not-allowed font-light"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Dark Dim Backdrop Layer */}
      <div
        className={`fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCart ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleCart}
      ></div>
    </div>
  );
}
