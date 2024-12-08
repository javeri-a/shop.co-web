import Image from "next/image";


export default function Footer() {
    return (
      <footer className="bg-[#F0F0F0] text-black py-12 pt-28">
        <div className="container mx-auto px-4">
        
  
          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12">
            <div>
              <h3 className="font-bold mb-4">SHOP.CO</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li><a href="/cart" className="hover:text-gray-950">Cart</a></li>
                <li><a href="#" className="hover:text-gray-950">Career</a></li>
                <li><a href="#" className="hover:text-gray-950">Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">COMPANY</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li><a href="#" className="hover:text-gray-950">About</a></li>
                <li><a href="#" className="hover:text-gray-950">Features</a></li>
                <li><a href="#" className="hover:text-gray-950">Works</a></li>
                <li><a href="#" className="hover:text-gray-950">Career</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">HELP</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li><a href="#" className="hover:text-gray-950">Customer Support</a></li>
                <li><a href="#" className="hover:text-gray-950">Delivery Details</a></li>
                <li><a href="#" className="hover:text-gray-950">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-gray-950">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">FAQ</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li><a href="#" className="hover:text-gray-950">Account</a></li>
                <li><a href="#" className="hover:text-gray-950">Manage Deliveries</a></li>
                <li><a href="#" className="hover:text-gray-950">Orders</a></li>
                <li><a href="#" className="hover:text-gray-950">Payments</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">RESOURCES</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                <li><a href="#" className="hover:text-gray-950">Free eBooks</a></li>
                <li><a href="#" className="hover:text-gray-950">Development Tutorial</a></li>
                <li><a href="#" className="hover:text-gray-950">How to - Blog</a></li>
                <li><a href="#" className="hover:text-gray-950">Youtube Playlist</a></li>
              </ul>
            </div>
          </div>
  
          {/* Copyright and Payment Info */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-800 mb-4 sm:mb-0">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex gap-0">
              <Image src="/f1.png"
               alt="Visa"
                width={46.61}
                height={30.03}
                 className="p-1" />

              <Image src="/f2.png" 
              alt="Mastercard" 
               width={46.61}
               height={30.03} 
              className="p-1" />

              <Image src="/f5.png"
               alt="PayPal"
                width={46.61} 
                height={30.03}
                 className="p-1" />

              <Image src="/f4.png"
               alt="Apple Pay" 
                 width={46.61}
                  height={30.03}
                   className="p-1" />
            </div>
          </div>
        </div>
      </footer>
    )
  }
  