

"use client";

import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { ShoppingCartIcon, User2Icon } from "lucide-react";
import Link from "next/link";

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  priceWithoutDiscount: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  sizes: string[];
  image: string;
};

const navLinks = [
  { href: "/", label: "Shop" },
 
  { href: "/allproducts", label: "On Sale" },
  { href: "/allproducts", label: "Products" },
];

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "products"] {
        _id,
        name,
        description,
        price,
        discountPercentage,
        priceWithoutDiscount,
        rating,
        ratingCount,
        tags,
        sizes,
        "image": image.asset->url
      }`;
      const response = await fetch("/api/your-endpoint", {
        method: "POST",
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setAllProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAllProducts(filtered);
  };

  return (
    <div className="relative">
      <div className="bg-black text-white text-sm text-center py-2">
        Enjoy up to 50% off on your first order.{" "}
        <a href="/allproducts" className="underline">
          Shop Now
        </a>
      </div>

      <nav className="flex justify-between items-center bg-white px-4 md:px-6 py-4 shadow-md">
        <AiOutlineMenu
          className="text-xl text-gray-600 hover:text-black cursor-pointer font-bold md:hidden"
          onClick={toggleSidebar}
        />
        <div className="text-2xl font-bold flex-grow md:flex-grow-0">
          <Link href="/">SHOP.CO</Link>
        </div>

        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-600 hover:text-black">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center w-1/3">
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <button>
              <ShoppingCartIcon className="text-xl text-gray-600 hover:text-black cursor-pointer" />
            </button>
          </Link>
        
          
       <ClerkProvider>
  <div className="auth-section">
    <SignedIn>
      <UserButton>
        <button className="flex items-center text-gray-600 hover:text-black p-2 rounded-lg transition-all duration-300">
          <User2Icon className="text-lg" />
        </button>
      </UserButton>
    </SignedIn>
    <SignedOut>
      <SignInButton>
        <button className="flex items-center text-gray-600 hover:text-black p-2 rounded-lg transition-all duration-300">
          <User2Icon className="text-lg" />
        </button>
      </SignInButton>
    </SignedOut>
  </div>
</ClerkProvider>

        </div>
      </nav>

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
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-600 hover:text-black">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
