"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/product-card"
import { getAllProducts } from "@/products"
import type { Product } from "@/store"

export default function FeaturedListings() {
  const [featuredListings, setFeaturedListings] = useState<Product[]>([])
  const router = useRouter()

  useEffect(() => {
    // Get first 6 products as featured
    const allProducts = getAllProducts()
    setFeaturedListings(allProducts.slice(0, 6))
  }, [])

  const handleViewAllClick = useCallback(() => {
    // Preserve scroll position
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop

    router.push("/search")

    // Restore scroll position
    setTimeout(() => {
      window.scrollTo({ top: currentScroll, behavior: "auto" })
    }, 0)
  }, [router])

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Featured Listings</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the best deals from trusted sellers in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.map((listing) => (
            <ProductCard key={listing.id} product={listing} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="group bg-transparent focus-no-scroll"
            onClick={handleViewAllClick}
          >
            <span className="flex items-center">
              View All Listings
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  )
}
