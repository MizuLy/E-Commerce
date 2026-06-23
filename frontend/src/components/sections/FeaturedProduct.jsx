import React from "react";

export default function FeaturedProduct() {
  return (
    <section id="featured" className="bg-white w-full h-[100vh] py-[90px]">
      <div className="flex justify-center">
        <h1 className="text-2xl font-comfortaa">Featured Products</h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-4 gap-10">
          <div className="w-[100px] h-[100px] bg-blue-200">Box</div>
          <div className="w-[100px] h-[100px] bg-blue-200">Box</div>
          <div className="w-[100px] h-[100px] bg-blue-200">Box</div>
          <div className="w-[100px] h-[100px] bg-blue-200">Box</div>
          <div className="w-[100px] h-[100px] bg-blue-200">Box</div>
          <div className="w-[100px] h-[100px] bg-blue-200">Box</div>
        </div>
      </div>
    </section>
  );
}
