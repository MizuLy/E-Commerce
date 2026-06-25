import { useState, useEffect } from "react";
import axios from "axios";

export default function FeaturedProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-commerce-afaq.onrender.com/api/products")
      .then((res) => setProducts(res.data.data));
  }, []);

  return (
    <section
      id="featured"
      className="bg-white w-full min-h-[100vh] py-[90px] px-10"
    >
      <div className="flex justify-center mb-10">
        <h1 className="text-3xl font-comfortaa font-bold">Featured Products</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                {product.category}
              </p>
              <h3 className="font-semibold text-sm">{product.name}</h3>
              <p className="text-sm font-bold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
