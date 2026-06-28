import React, { useEffect, useState, useRef } from "react";
import { LuChevronLeft, LuChevronRight, LuPlus } from "react-icons/lu";
import { getProducts } from "../../api/Products";

const categories = ["ALL", "APPAREL", "ACCESSORIES", "BAGS", "SHOES"];

export default function FeaturedProduct() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [products, setProducts] = useState([]);
  const scrollContainerRef = useRef(null);

  // Fetch products from API based on category selection
  const fetchProducts = async (category = "") => {
    try {
      const params = { featured: true };
      if (category && category !== "ALL") params.category = category;
      const res = await getProducts(params);
      setProducts(res.data.data);
    } catch (err) {
      console.log("Failed to fetch products! ", err);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  // Smooth slider navigation calculations
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const cardWidthWithGap = 320 + 24; // Card width base + flex gap
      const scrollTo =
        direction === "left"
          ? scrollLeft - cardWidthWithGap
          : scrollLeft + cardWidthWithGap;

      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="featured"
      className="bg-zinc-950 text-white w-full min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-2 font-light">
              Curated Selection
            </p>
            <h2 className="text-2xl md:text-3xl font-comfortaa tracking-wide font-light">
              Featured Products
            </h2>
          </div>

          {/* Minimal Filter Sub-Navigation */}
          <div className="flex gap-6 border-b border-zinc-900 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative text-[10px] tracking-[0.25em] font-light transition-colors duration-300 ${
                  activeCategory === category
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {category}
                {activeCategory === category && (
                  <span className="absolute -bottom-[11px] left-0 w-full h-[1px] bg-white transition-all duration-300" />
                )}
              </button>
            ))}
          </div>

          {/* Slider Left/Right Arrows Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors duration-300 focus:outline-none"
              aria-label="Scroll left"
            >
              <LuChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors duration-300 focus:outline-none"
              aria-label="Scroll right"
            >
              <LuChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Slider Track Row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products &&
            products.map((item) => (
              <div
                key={item.id || item._id}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start group cursor-pointer"
              >
                {/* Product Card Image Frame */}
                <div className="aspect-[3/4] w-full bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden relative transition-all duration-500 group-hover:border-zinc-700">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-xs tracking-widest text-zinc-700 uppercase">
                      [ No Image ]
                    </span>
                  )}

                  {/* Desktop Add to Bag Action Layer (Hover overlay placeholder) */}
                  <div className="hidden md:flex absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center p-4">
                    <button className="bg-white text-black px-4 py-2.5 text-[10px] tracking-[0.2em] uppercase font-light hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-xl">
                      <LuPlus size={12} /> Add To Bag
                    </button>
                  </div>
                </div>

                {/* Product Matrix Labels */}
                <div className="mt-4 flex justify-between items-start text-xs tracking-wider">
                  <div>
                    <p className="text-zinc-500 uppercase text-[9px] tracking-[0.2em] mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-zinc-200 font-light group-hover:text-white transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-zinc-400 font-light mb-1">
                      {typeof item.price === "number"
                        ? `$${item.price.toFixed(2)}`
                        : item.price}
                    </p>

                    {/* Mobile Only Quick Action Trigger */}
                    <button className="md:hidden text-[9px] tracking-widest text-white border-b border-zinc-700 pb-0.5 flex items-center gap-1 ml-auto mt-1">
                      + BAG
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
