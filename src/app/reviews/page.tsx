

"use client"

import { Star, BadgeCheck } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  review: string
  rating: number
}

export default function TestimonialsCarousel() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah M",
      review: "I recently purchased a dress from Fashion that turned out to be better than I expected. The quality is amazing and the fit is just perfect! I've already received so many compliments.",
      rating: 5,
    },
    {
      id: 2,
      name: "Alex K",
      review: "I was skeptical about buying clothes online due to size and quality concerns. The clothes fit perfectly and the quality exceeded my expectations. Will definitely shop here again!",
      rating: 5,
    },
    {
      id: 3,
      name: "James L",
      review: "Great experience shopping here! The product descriptions were accurate, shipping was fast, and the clothes look exactly like the photos. The prices are reasonable for the quality you get.",
      rating: 5,
    },
    {
      id: 4,
      name: "Michael R",
      review: "Outstanding service and quality products! The attention to detail in both the clothes and customer service is impressive. Highly recommend to anyone looking for quality fashion.",
      rating: 5,
    },
  ]

  const renderStars = (rating: number) => {
    return Array(rating)
      .fill(null)
      .map((_, index) => (
        <Star
          key={index}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      ))
  }

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          OUR HAPPY CUSTOMERS
        </h2>

        <div className="w-full relative">
          {/* Carousel Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white shadow-md p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex">{renderStars(testimonial.rating)}</div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{testimonial.name}</span>
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {testimonial.review}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
