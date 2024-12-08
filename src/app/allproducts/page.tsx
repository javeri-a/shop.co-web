
"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductListingPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    price: "",
    colors: [],
    size: "",
    dressStyle: "",
  });

  const products = [
    {
      id: 1,
      name: "Gradient Graphic T-shirt",
      price: "$145",
      image: "/d1.png",
    },
    {
      id: 2,
      name: "Polo with Tipping Details",
      price: "$180",
      image: "/p2.png",
    },
    {
      id: 3,
      name: "Black Striped T-shirt",
      price: "$120",
      originalPrice: "$160",
      image: "/na3.png",
    },
    {
      id: 4,
      name: "Skinny Fit Jeans",
      price: "$240",
      originalPrice: "$260",
      image: "/c1.png",
    },
    {
      id: 5,
      name: "Checkered Shirt",
      price: "$180",
      image: "/c3.png",
    },
    {
      id: 6,
      name: "Sleeve Striped T-shirt",
      price: "$130",
      originalPrice: "$160",
      image: "/p3.png",
    },
    {
      id: 7,
      name: "Vertical Striped Shirt",
      price: "$212",
      image: "/p2.png",
    },
    {
      id: 8,
      name: "Courage Graphic T-shirt",
      price: "$145",
      image: "/shirt3.PNG",
    },
    {
      id: 9,
      name: "Loose Fit Bermuda Shorts",
      price: "$120",
      image: "/shirt1.PNG",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="col-span-1 bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="font-semibold text-lg mb-4">Filter</h2>

          {/* Category */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Category</h3>
            <select
              className="w-full border rounded-md p-2"
              onChange={(e) =>
                setSelectedFilters({ ...selectedFilters, category: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="shirts">Shirts</option>
              <option value="pants">Pants</option>
              <option value="jeans">Jeans</option>
            </select>
          </div>

          {/* Price */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Price</h3>
            <div>
              <input type="checkbox" id="low" className="mr-2" />
              <label htmlFor="low">$0 - $50</label>
            </div>
            <div>
              <input type="checkbox" id="mid" className="mr-2" />
              <label htmlFor="mid">$50 - $100</label>
            </div>
            <div>
              <input type="checkbox" id="high" className="mr-2" />
              <label htmlFor="high">$100+</label>
            </div>
          </div>

          {/* Colors */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {["red", "blue", "yellow", "green", "purple", "orange"].map((color) => (
                <div
                  key={color}
                  className={`w-6 h-6 rounded-full border border-gray-300`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Size</h3>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Dress Style */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Dress Style</h3>
            <select
              className="w-full border rounded-md p-2"
              onChange={(e) =>
                setSelectedFilters({ ...selectedFilters, dressStyle: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
            </select>
          </div>

          <button className="w-full bg-black text-white py-2 rounded-md mt-4">
            Apply Filter
          </button>
        </aside>

        {/* Product Listing */}
        <div className="col-span-3">
          <h1 className="text-xl font-bold mb-6">Casual</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-md p-4 shadow-md hover:shadow-lg"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                   className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-sm font-semibold mb-2">{product.name}</h3>
                <div className="text-sm font-medium text-gray-600">
                  {product.originalPrice && (
                    <span className="line-through text-gray-400 mr-2">
                      {product.originalPrice}
                    </span>
                  )}
                  {product.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

