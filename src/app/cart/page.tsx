
"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Gradient Graphic T-shirt",
      size: "Large",
      color: "White",
      price: 145,
      quantity: 1,
      image: "/c1.png", 
    },
    {
      id: 2,
      name: "Checkered Shirt",
      size: "Medium",
      color: "Red",
      price: 180,
      quantity: 1,
      image: "/c2.png", 
    },
    {
      id: 3,
      name: "Skinny Fit Jeans",
      size: "Medium",
      color: "Blue",
      price: 240,
      quantity: 1,
      image: "/c3.png", 
    },
  ]);

  const deliveryFee = 15;
  const discount = 0.2; // 20% discount

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        Home &gt; Cart
      </nav>

      <h1 className="text-2xl font-bold mb-6">YOUR CART</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
              <Image src={item.image} alt={item.name} height={20}  width={20} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  Size: {item.size} <br />
                  Color: {item.color}
                </p>
                <p className="font-semibold text-lg mt-2">${item.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount (20%)</span>
              <span className="text-red-500">-${discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Add promo code"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            />
            <button className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900">
              Apply
            </button>
            <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Go to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
