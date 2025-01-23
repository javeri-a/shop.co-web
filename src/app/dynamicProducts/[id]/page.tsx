

"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

import { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  discountPercent?: number;
  description?: string;
}

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("olive");
  const [selectedSize, setSelectedSize] = useState("medium");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData: Product | null = await client.fetch(
          `*[_type == "products" && _id == $id][0]{
            _id,
            name,
            "image": image.asset->url,
            price,
            originalPrice,
            rating,
            discountPercent,
            description
          }`,
          { id: params.id }
        );
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem: CartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      };

      const storedCart = localStorage.getItem("cart");
      const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

      const existingItemIndex = cart.findIndex((item) => item._id === cartItem._id);
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} has been added to your cart!`);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Content */}
          <div className="w-full md:w-1/2">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-2xl"
              />
            ) : (
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <span>No Image Available</span>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold text-green-600">${product.price}</span>
              {product.originalPrice && (
                <span className="line-through text-gray-500">${product.originalPrice}</span>
              )}
            </div>
            <p className="text-lg text-gray-700">{product.description || "No description available."}</p>
            <div className="space-y-2">
              <h1>Select Colors</h1>
              <div className="flex gap-2">
                {["olive", "black", "gray"].map((color) => (
                  <label key={color}>
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                      className="peer sr-only"
                    />
                    <span
                      className={`w-8 h-8 rounded-full cursor-pointer ${
                        selectedColor === color ? "ring-2 ring-black" : ""
                      }`}
                      style={{ backgroundColor: color }}
                    ></span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Choose Size</p>
              <div className="grid grid-cols-5 gap-2">
                {["X-small", "small", "medium", "large", "X-large"].map((size) => (
                  <label key={size} className="cursor-pointer">
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={() => setSelectedSize(size)}
                      className="peer sr-only"
                    />
                    <span className="flex h-10 w-full items-center justify-center border rounded-full bg-slate-100 text-sm font-medium peer-checked:bg-black peer-checked:text-white">
                      {size.toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex h-10 w-full items-center justify-center border rounded-full bg-black text-white text-sm font-medium"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
