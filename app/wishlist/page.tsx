"use client"

import { useApp } from "@/store"
import ProductCard from "@/product-card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"

const WishlistPage = () => {
  const { state } = useApp()

  const favoriteProducts = state.wishlist || []

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="h-6 w-6 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
          </div>

          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Start adding items you love to your wishlist</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-6 w-6 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">({favoriteProducts.length} items)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
