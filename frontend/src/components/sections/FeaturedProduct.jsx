import React, { useEffect, useState } from "react";

import { getProducts } from "../../api/Products";

const categories = ["ALL", "APPAREL", "ACCESSORIES", "BAGS"];

export default function FeaturedProduct() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const [products, setProducts] = useState([]);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data);
    } catch (err) {
      console.log("Failed to fetch products! ", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  // Filter product based on selected category
  const filteredProduct =
    activeCategory === "ALL"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section
      id="featured"
      className="bg-zinc-950 text-white w-full min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-2 font-light">
            Curated Selection
          </p>
          <h2 className="text-2xl md:text-3xl font-comfortaa tracking-wide font-light">
            Featured Product
          </h2>
        </div>

        {/* Minimal Sub-Navigation / Filter Bar */}
        <div className="flex justify-center my-10 border-b border-zinc-900">
          <div className="flex gap-8 pb-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative text-[11px] tracking-[0.25em] font-light transition-colors duration-300 ${
                  activeCategory === category
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {category}
                {/* Active Underline Indicator */}
                {activeCategory === category && (
                  <span className="absolute -bottom-[13px] left-0 w-full h-[1px] bg-white transition-all duration-300" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 transition-all duration-500">
          {filteredProduct.map((products) => (
            <div
              key={products.id}
              className="group cursor-pointer animate-fade-in"
            >
              {/* Product Image Placeholder */}
              <div className="aspect-[3/4] w-full bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-zinc-700">
                <span className="text-xs tracking-widest text-zinc-600 uppercase transform transition-transform duration-500 group-hover:scale-105">
                  [ Image ]
                </span>
              </div>

              {/* Product Details */}
              <div className="mt-4 flex justify-between items-start text-xs tracking-wider">
                <div>
                  <p className="text-zinc-500 uppercase text-[10px] tracking-[0.2em] mb-1">
                    {products.category}
                  </p>
                  <h3 className="text-zinc-200 font-light group-hover:text-white transition-colors">
                    {products.name}
                  </h3>
                </div>
                <p className="text-zinc-400 font-light">{products.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
