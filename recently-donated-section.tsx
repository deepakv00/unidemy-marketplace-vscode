"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/product-card"
import { getDonateGiveawayProducts } from "@/products"
import type { Product } from "@/store"

export default function RecentlyDonatedSection() {
  const [donatedItems, setDonatedItems] = useState<Product[]>([])
  const router = useRouter()

  useEffect(() => {
    // Get first 3 donated products
    const donatedProducts = getDonateGiveawayProducts()
    setDonatedItems(donatedProducts.slice(0, 3))
  }, [])

  const handleViewAllClick = useCallback(() => {
    // Preserve scroll position
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop

    router.push("/category/donate-giveaway")

    // Restore scroll position
    setTimeout(() => {
      window.scrollTo({ top: currentScroll, behavior: "auto" })
    }, 0)
  }, [router])

  if (donatedItems.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/10 dark:via-emerald-900/10 dark:to-teal-900/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-4">
            <Heart className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">Community Giving</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Recently Donated Items</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover amazing items that community members are giving away for free. Help reduce waste and find
            treasures!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donatedItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus-no-scroll"
            onClick={handleViewAllClick}
          >
            <span className="flex items-center">
              View All Free Items
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-green-200 dark:border-green-800">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Have items to donate?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our community of givers! List your items for free and help them find a new home instead of ending up
              in landfills.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-green-500 text-green-700 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-900/20 focus-no-scroll"
              onClick={() => router.push("/sell")}
            >
              Donate an Item
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
