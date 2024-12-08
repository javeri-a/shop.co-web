
import Image from "next/image"
import { Star, StarHalf } from 'lucide-react'
import Link from "next/link"

interface Product {
  id: number
  name: string
  image: string
  rating: number
  price: number
  originalPrice?: number
}

export default function TopSelling () {
  const products: Product[] = [
    {
      id: 1,
      name: "T-shirt with Tape Details",
      image: "/shirt1.png",
      rating: 4.5,
      price: 120,
    },
    {
      id: 2,
      name: "Skinny Fit Jeans",
      image: "/shirt2.png",
      rating: 3.5,
      price: 240,
      originalPrice: 260,
    },
    {
      id: 3,
      name: "Checkered Shirt",
      image: "/shirt3.png",
      rating: 4.5,
      price: 180,
    },
    {
      id: 4,
      name: "Sleeve Striped T-shirt",
      image: "/shirt4.png",
      rating: 4.5,
      price: 130,
      originalPrice: 160,
    },
  ]

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
        />
      )
    }

    return stars
  }

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          TOP SELLING
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group cursor-pointer"
            >
              <div className="relative aspect-square mb-4 rounded-2xl bg-[#F5F5F5] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-base font-medium text-gray-900">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-500 ml-1">
                    {product.rating}/5
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="text-red-500 text-sm">
                        -{Math.round((1 - product.price/product.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="text-gray-600 hover:text-gray-900 text-sm font-medium border px-6 py-3 rounded-full">
          <Link href = "/allproducts">
            View All
            </Link>
          </button>
        </div>
      </div>
    </section>
  )
}

