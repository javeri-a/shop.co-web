
"use client";

import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { ShoppingCartIcon, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Type definition for the product
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
  image: string; // Image URL
};

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState(""); // State for search query
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // State for filtered products
  const [allProducts, setAllProducts] = useState<Product[]>([]); // State for all products

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Fetch all product data on component mount
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
      setAllProducts(data); // Store all products
      setFilteredProducts(data); // Initially, show all products
    };

    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Filter products based on search query
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered); // Update filtered products
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
          Products
          </Link>
         
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
              Products
            </Link>
        
          </div>
        </div>
      )}

    
      <div className="mt-6 px-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p>{product.description}</p>
                <p className="font-bold text-lg mt-2">${product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found for {query}</p>
        )}
      </div>
    </div>
  );
}
