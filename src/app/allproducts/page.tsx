

"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-6 text-center">Our Products</h1>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-6"
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
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" }} // Hover animation
          >
            <Link href={`/dynamicProducts/${product._id}`}>
              <div className="bg-white rounded-lg p-12  shadow-lg hover:shadow-xl cursor-pointer transform transition duration-300 ease-in-out h-full">
                <div className="relative mb-6">
                  <Image
                    src={urlFor(product.imageUrl).url()}
                    alt={product.name}
                    width={400}
                    height={800}  // Increased height for image
                    className="w-full h-64 object-cover rounded-md mb-4 transition-transform duration-300"
                  />
                  {product.discountPercentage && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white py-1 px-3 rounded-bl-lg text-xs font-semibold">
                      {product.discountPercentage}% OFF
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
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
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  )}
                  {product.ratingCount && (
                    <div className="text-sm text-gray-500 ml-3">{product.ratingCount} reviews</div>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      
    </div>
  );
}
