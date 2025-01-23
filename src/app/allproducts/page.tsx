


"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@mui/material"; 

interface Product {
  _id: string;
  name: string;
  price: number;
  priceWithoutDiscount?: number;
  discountPercentage?: number;
  imageUrl: string;
  rating?: number;
  ratingCount?: number;
  tags?: string[];
  sizes?: string[];
}

export default function ProductListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]); 

  useEffect(() => {
    async function fetchProducts() {
      const query = `*[_type == "products"] {
        _id,
        name,
        price,
        "imageUrl": image.asset->url,
        priceWithoutDiscount,
        discountPercentage,
        rating,
        ratingCount,
        tags,
        sizes
      }`;
      const data: Product[] = await client.fetch(query);
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/4 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:underline">T-Shirts</li>
            <li className="cursor-pointer hover:underline">Dresses</li>
            <li className="cursor-pointer hover:underline">Shoes</li>
            <li className="cursor-pointer hover:underline">Jackets</li>
          </ul>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Price</h3>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "red",
              "blue",
              "green",
              "yellow",
              "black",
              "white",
            ].map((color) => (
              <div
                key={color}
                className={`w-6 h-6 rounded-full cursor-pointer border border-gray-300`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <span
                key={size}
                className="px-3 py-1 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Dress Style */}
        <div>
          <h3 className="text-md font-semibold mb-2">Dress Style</h3>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:underline">Casual</li>
            <li className="cursor-pointer hover:underline">Formal</li>
            <li className="cursor-pointer hover:underline">Party</li>
            <li className="cursor-pointer hover:underline">Gym</li>
          </ul>
        </div>

        {/* Apply Filter Button */}
        <button className="w-full mt-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition">
          Apply Filter
        </button>
      </div>

      {/* Product Listing */}
      <div className="w-full lg:w-3/4">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Our Products
        </h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Link href={`/dynamicProducts/${product._id}`}>
                <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl cursor-pointer transition-transform duration-300 h-full">
                  <div className="relative mb-4">
                    <Image
                      src={urlFor(product.imageUrl).url()}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-56 object-cover rounded-md transition-transform duration-300"
                    />
                    {product.discountPercentage && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded-md text-xs font-semibold">
                        {product.discountPercentage}% OFF
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xl font-bold text-gray-800">
                      ${product.price}
                    </div>
                    {product.priceWithoutDiscount && (
                      <div className="text-sm text-gray-400 line-through">
                        ${product.priceWithoutDiscount}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {product.rating && (
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-sm text-gray-700">{product.rating}</span>
                      </div>
                    )}
                    {product.ratingCount && (
                      <div className="text-sm text-gray-500 ml-3">
                        ({product.ratingCount} reviews)
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
