

import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <div className="relative bg-[#F2F0F1] text-black flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-16 py-8 md:py-12">
      {/* Left Content */}
      <div className="w-full md:w-1/2 max-w-lg space-y-4 md:space-y-6 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
          FIND CLOTHES <br />
          THAT MATCHES <br />
          YOUR STYLE
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base px-4 md:px-0">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality
          and cater to your sense of style.
        </p>
        <button className="w-full sm:w-auto px-8 sm:px-10 py-2.5 sm:py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-all duration-300">
          <Link href="/allproducts">Shop Now</Link>
        </button>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-center md:text-left py-6 md:py-8">
          <div className="space-y-1">
            <h1 className="font-extrabold text-xl sm:text-2xl">200+</h1>
            <span className="text-gray-400 text-xs sm:text-sm block">International Brands</span>
          </div>
          <div className="space-y-1">
            <h2 className="font-extrabold text-xl sm:text-2xl">2000+</h2>
            <span className="text-gray-400 text-xs sm:text-sm block">High Quality Products</span>
          </div>
          <div className="space-y-1 col-span-2 sm:col-span-1">
            <h3 className="font-extrabold text-xl sm:text-2xl">30,000</h3>
            <span className="text-gray-400 text-xs sm:text-sm block">Happy Customers</span>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="relative w-full md:w-1/2 mt-6 md:mt-0">
        <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md mx-auto">
          <Image
            src={"/hero.png"}
            alt="Stylish clothing models"
            width={400}
            height={690}
            className="w-full h-auto object-cover"
            priority
          />
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        </div>
      </div>
    </div>
  )
}

