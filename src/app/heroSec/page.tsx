import Image from "next/image";
import Link from "next/link";

export default function Navbar(){
      return(
           <div className="relative bg-[#F2F0F1] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12">
             {/* Left Content */}
             <div className="max-w-lg space-y-6">
               <h1 className="text-4xl  font-extrabold md:text-5xl  text-black">
                 FIND CLOTHES <br />
                 THAT MATCHES <br />
                 YOUR STYLE
               </h1>
               <p className="text-gray-600">
                 Browse through our diverse range of meticulously crafted garments,
                 designed to bring out your individuality and cater to your sense of
                 style.
               </p>
               <button className="px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800"> <Link href = "/allproducts">
                 Shop Now
                 </Link>
               </button>
             </div>
       
             {/* Right Content */}
             <div className="relative mt-12 md:mt-0">
               {/* Image */}
               <Image
                 src="/hero.png" 
                 alt="Stylish clothing models"
                 width={400}
                 height={690}
                 className="w-full max-w-md md:max-w-lg"
               />
       
               
             </div>
           </div>
        
       
    )
}