

"use client";

import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { ShoppingCartIcon, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Top Black Banner */}
      <div className="bg-black text-white text-sm text-center py-2">
        Enjoy up to 50% off on your first order.{" "}
        <a href="/allproducts" className="underline">
          Shop Now
        </a>
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white px-4 md:px-6 py-4 shadow-md">
        {/* Hamburger Button (Left Side) */}
        <AiOutlineMenu
          className="text-xl text-gray-600 hover:text-black cursor-pointer font-bold md:hidden"
          onClick={toggleSidebar}
        />

        {/* Logo */}
        <div className="text-2xl font-bold flex-grow md:flex-grow-0">
          <Link href="/">SHOP.CO</Link>
        </div>

        {/* Centered Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-black">
            Shop
          </Link>
          <Link href="#" className="text-gray-600 hover:text-black">
            On Sale
          </Link>
          <Link href="/allproducts" className="text-gray-600 hover:text-black">
            New Arrivals
          </Link>
          <Link href="/details" className="text-gray-600 hover:text-black">
            Product Detail
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-1/3">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button>
            <Link href="/cart">
              <ShoppingCartIcon className="text-xl text-gray-600 hover:text-black cursor-pointer" />
            </Link>
          </button>
          <button>
            <User className="text-xl text-gray-600 hover:text-black cursor-pointer" />
          </button>
        </div>
      </nav>

      {/* Sidebar (Responsive for Mobile) */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg z-50 md:hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <div className="text-xl font-bold">SHOP.CO</div>
            <AiOutlineClose
              className="text-xl text-gray-600 cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link href="/" className="text-gray-600 hover:text-black">
              Shop
            </Link>
            <Link href="/allproducts" className="text-gray-600 hover:text-black">
              On Sale
            </Link>
            <Link href="/allproducts" className="text-gray-600 hover:text-black">
              New Arrivals
            </Link>
            <Link href="/details" className="text-gray-600 hover:text-black">
              Product Detail
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
