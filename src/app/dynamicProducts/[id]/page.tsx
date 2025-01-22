


"use client";
import Like from "@/app/alsoLike/page";
import TestimonialsCarousel from "@/app/reviews/page";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
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

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("olive");
  const [selectedSize, setSelectedSize] = useState("m");

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
                <input
                  type="radio"
                  id="olive"
                  name="color"
                  value="olive"
                  checked={selectedColor === "olive"}
                  onChange={() => setSelectedColor("olive")}
                  className="peer sr-only"
                />
                <label
                  htmlFor="olive"
                  className={`w-8 h-8 rounded-full ${selectedColor === "olive" ? "ring-2 ring-black" : ""}`}
                  style={{ backgroundColor: "#808000" }}
                ></label>

                <input
                  type="radio"
                  id="black"
                  name="color"
                  value="black"
                  checked={selectedColor === "black"}
                  onChange={() => setSelectedColor("black")}
                  className="peer sr-only"
                />
                <label
                  htmlFor="black"
                  className={`w-8 h-8 rounded-full ${selectedColor === "black" ? "ring-2 ring-black" : ""}`}
                  style={{ backgroundColor: "#000000" }}
                ></label>

                <input
                  type="radio"
                  id="gray"
                  name="color"
                  value="gray"
                  checked={selectedColor === "gray"}
                  onChange={() => setSelectedColor("gray")}
                  className="peer sr-only"
                />
                <label
                  htmlFor="gray"
                  className={`w-8 h-8 rounded-full ${selectedColor === "gray" ? "ring-2 ring-black" : ""}`}
                  style={{ backgroundColor: "#808080" }}
                ></label>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Choose Size</p>
              <div className="grid grid-cols-5 gap-2">
                {["X-small", "small", "medium", "large", "X-large"].map((size) => (
                  <div key={size} className="flex items-center">
                    <input
                      type="radio"
                      id={size}
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={() => setSelectedSize(size)}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={size}
                      className="flex h-10 w-full cursor-pointer items-center justify-center border rounded-full bg-slate-100 border-gray-200 text-sm font-medium peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                    >
                      {size.toUpperCase()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex h-10 w-full text-white cursor-pointer items-center justify-center border rounded-full bg-black border-gray-200 text-sm font-medium"
            >
              <Link href="/cart">
                Add to Cart
              </Link>
            </button>
          </div>
        </div>
      </div>

      <TestimonialsCarousel />
      <Like />
    </section>
  );
}
