"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Truck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/product-card"
import { getMovingOutProducts } from "@/products"
import type { Product } from "@/store"

export default function MovingOutDealsSection() {
  const [movingOutItems, setMovingOutItems] = useState<Product[]>([])
  const router = useRouter()

  useEffect(() => {
    // Get first 3 moving out products
    const movingProducts = getMovingOutProducts()
    setMovingOutItems(movingProducts.slice(0, 3))
  }, [])

  const handleViewAllClick = useCallback(() => {
    // Preserve scroll position
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop

    router.push("/category/moving-out")

    // Restore scroll position
    setTimeout(() => {
      window.scrollTo({ top: currentScroll, behavior: "auto" })
    }, 0)
  }, [router])

  if (movingOutItems.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/10 dark:via-orange-900/10 dark:to-yellow-900/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 mb-4">
            <Truck className="h-4 w-4 text-red-600 mr-2" />
            <span className="text-sm font-medium text-red-800 dark:text-red-200">Urgent Sales</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Moving Out Deals</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Incredible deals from people who need to sell quickly! Don't miss these time-sensitive offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movingOutItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 focus-no-scroll animate-pulse"
            onClick={handleViewAllClick}
          >
            <span className="flex items-center">
              View All Urgent Deals
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>

        {/* Urgency Indicator */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-red-600 mr-2 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Time-Sensitive Offers</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              These sellers need to move quickly and are offering significant discounts. Items may sell fast, so act
              now!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-red-800 dark:text-red-200">Up to 70% Off</span>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-orange-800 dark:text-orange-200">Quick Sale</span>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Must Go This Week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
