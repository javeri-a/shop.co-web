

"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Star, StarHalf } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

interface Product {
  _id: string
  name: string
  image: string
  rating: number
  price: number
  priceWithoutDiscount?: number
}

export default function TopSelling() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "products"][0...4] {
        _id,
        name,
        "image": image.asset._ref,
        price,
        priceWithoutDiscount,
        rating
      }`
      const fetchedProducts = await client.fetch(query)
      setProducts(fetchedProducts)
    }

    fetchProducts()
  }, [])

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
            <Link key={product._id} href={`/dynamicProducts/${product._id}`}>
              <div className="group cursor-pointer">
                <div className="relative aspect-square mb-4 rounded-2xl bg-[#F5F5F5] overflow-hidden">
                  <Image
                    src={urlFor(product.image).width(300).url()}
                    alt={product.name}
                    width={300}
                    height={300}
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
                    {product.priceWithoutDiscount && (
                      <>
                        <span className="text-gray-500 line-through">
                          ${product.priceWithoutDiscount}
                        </span>
                        <span className="text-red-500 text-sm">
                          -{Math.round((1 - product.price / product.priceWithoutDiscount) * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="text-gray-600 hover:text-gray-900 text-sm font-medium border px-6 py-3 rounded-full">
            <Link href="/allproducts">
              View All
            </Link>
          </button>
        </div>
      </div>
    </section>
  )
}
