


"use client"

import { useState } from "react"
import Image from "next/image"
import { Star } from 'lucide-react'

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("olive")
  const [selectedSize, setSelectedSize] = useState("m")

  const images = [
    "/d1.png",
    "/d1.png",
    "/d1.png"
  ]

  const reviews = [
    { id: 1, rating: 4, author: "Sarah M.", text: "Great quality and fit! Exactly what I was looking for." },
    { id: 2, rating: 5, author: "Michael R.", text: "Perfect fit and very comfortable. Will buy again!" },
    { id: 3, rating: 4, author: "James L.", text: "Nice material and good price. Shipping was fast." },
    { id: 4, rating: 5, author: "Emma S.", text: "Love the design and color. Fits perfectly." }
  ]

  const relatedProducts = [
    { id: 1, name: "Plain Cotton Tee", price: 45, image: "/p1.png" },
    { id: 2, name: "Summer Graphic Tee", price: 65, image: "/c1.png" },
    { id: 3, name: "Soft Plain Tee", price: 55, image: "/p2.png" },
    { id: 4, name: "Basic Round T-shirt", price: 50, image: "/p3.png" }
  ]

  const renderStars = (rating: number) => {
    return Array(5).fill(null).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={images[selectedImage]}
              alt="Product image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square w-20 bg-gray-100 rounded-lg overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-black" : ""
                }`}
              >
                <Image
                  src={"/image"}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold ">ONE LIFE GRAPHIC T-SHIRT</h1>
          ⭐⭐⭐⭐⭐ 4.5/5
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">$340</span>
            <span className="text-gray-500  text-xl line-through">$360</span>
            <span className="text-red-500 bg-red-400  rounded-full px-2">-40%</span>
             <br />
           
          </div>
          <p>This is graphic  t-shirt which is perfect for any occasion.Crafted from  a soft and breathable fabrics, it offers superior </p>
          <hr />

          {/* Color Selection */}
          <div className="space-y-2">
            <h1>Select Colors</h1>
            
            <p className="font-medium"></p>
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
            <br />
            <hr />
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <p className="font-medium">Choose Size</p>
            <br />
            <div className="grid grid-cols-5 gap-2 ">
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
                    className="flex h-10 w-full cursor-pointer items-center justify-center  border  rounded-full bg-slate-100 border-gray-200  text-sm font-medium peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                  >
                    {size.toUpperCase()}
                  </label>
                </div>
              ))}
            </div>
          </div>
           
           <div className="flex gap-3">
            <div>
          <button className="w-full bg-black text-white hover:bg-gray-900 py-2 px-16 mt-3 rounded-full">
            -  1  +
          </button>
          </div>
  
            <div>
          <button className="w-full bg-black text-white hover:bg-gray-900 py-2 px-14 mt-3 rounded-full ml-5">
          Add to Cart
          </button>
          </div>
  

          </div>
        </div>
      </div>

      
      {/* Reviews Section */}
<div className="mb-12 px-4 sm:px-6 lg:px-8">
  <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
    Customer Reviews
  </h2>
  <div className="space-y-6">
    {reviews.map((review) => (
      <div
        key={review.id}
        className="p-6 bg-white shadow-md rounded-lg border border-gray-200"
      >
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          {renderStars(review.rating)}
        </div>
        {/* Author */}
        <p className="font-semibold text-gray-800 text-lg mb-2">
          {review.author}
        </p>
        {/* Review Text */}
        <p className="text-gray-600 leading-relaxed">{review.text}</p>
      </div>
    ))}
  </div>
</div>


      {/* Related Products */}
      <div>
        <h2 className="text-4xl text-center font-bold mb-8">YOU MIGHT ALSO LIKE</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium">{product.name}</h3>
              ⭐⭐⭐⭐⭐ 4.5/5
              <p className="text-gray-900 text-xl font-bold">${product.price}</p>
           
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


