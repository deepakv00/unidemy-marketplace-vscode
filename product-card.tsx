"use client"

import type React from "react"

import { useState, useCallback } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Heart, MapPin, Clock, Star, Eye, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import type { Product } from "@/store"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export default function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false) // TODO: Implement wishlist with Supabase

  const handleAddToWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      // Preserve scroll position
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop

      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to add items to your favorites.",
          variant: "destructive",
        })
        router.push("/auth/login")
        return
      }

      // TODO: Implement wishlist functionality with Supabase
      if (isLiked) {
        setIsLiked(false)
        toast({
          title: "Removed from favorites",
          description: `${product.title} has been removed from your favorites.`,
        })
      } else {
        setIsLiked(true)
        toast({
          title: "Added to favorites",
          description: `${product.title} has been added to your favorites.`,
        })
      }

      // Restore scroll position
      setTimeout(() => {
        window.scrollTo({ top: currentScroll, behavior: "auto" })
      }, 0)
    },
    [user, isLiked, product, toast, router],
  )

  const handleContactSeller = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      // Preserve scroll position
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop

      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to contact sellers.",
          variant: "destructive",
        })
        router.push("/auth/login")
        return
      }

      router.push(`/messages?seller=${encodeURIComponent(product.seller.name)}&product=${product.id}`)

      // Restore scroll position
      setTimeout(() => {
        window.scrollTo({ top: currentScroll, behavior: "auto" })
      }, 0)
    },
    [user, product, toast, router],
  )

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      // Prevent default link behavior that might cause scrolling
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.closest("button")) {
        return // Let button handlers manage their own behavior
      }

      // Navigate without scrolling
      router.push(`/listing/${product.id}`)
    },
    [router, product.id],
  )

  // Get special badge for product
  const getSpecialBadge = () => {
    if (product.category === "donate-giveaway") {
      return <Badge className="bg-green-500 hover:bg-green-600 text-white font-bold">FREE</Badge>
    }
    if (product.category === "moving-out") {
      return <Badge className="bg-red-500 hover:bg-red-600 text-white font-bold animate-pulse">URGENT</Badge>
    }
    return null
  }

  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden prevent-layout-shift ${
        viewMode === "list" ? "flex flex-row" : ""
      }`}
    >
      <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
        <div
          className={`relative overflow-hidden cursor-pointer ${viewMode === "list" ? "h-32" : "h-64"}`}
          onClick={handleCardClick}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white focus-no-scroll"
              onClick={handleAddToWishlist}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </Button>
          </div>

          {/* Special badges */}
          <div className="absolute top-3 left-3">{getSpecialBadge()}</div>
        </div>

        <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
          <div className="flex items-start justify-between mb-3">
            <Badge variant="secondary" className="text-xs">
              {product.category === "donate-giveaway"
                ? "Donate/Giveaway"
                : product.category === "moving-out"
                  ? "Moving Out"
                  : product.category}
            </Badge>
            <div className="flex items-center text-xs text-gray-500">
              <Eye className="h-3 w-3 mr-1" />
              234
            </div>
          </div>

          <div className="cursor-pointer" onClick={handleCardClick}>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
              {product.title}
            </h3>
          </div>

          <div className="flex items-center mb-3">
            {product.category === "donate-giveaway" ? (
              <span className="text-2xl font-bold text-green-600">FREE</span>
            ) : (
              <>
                <span className="text-2xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </>
            )}
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            {product.location}
            <Clock className="h-4 w-4 ml-3 mr-1" />
            {product.timeAgo}
          </div>

          {/* Contact Seller Button */}
          <div className="mb-4">
            <Button
              type="button"
              size="sm"
              onClick={handleContactSeller}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus-no-scroll"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {product.category === "donate-giveaway" ? "Request Item" : "Contact Seller"}
            </Button>
          </div>

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mr-2">
                <span className="text-white text-xs font-semibold">{product.seller.name.charAt(0)}</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.seller.name}
                  {product.seller.verified && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      ✓
                    </Badge>
                  )}
                </div>
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-xs text-gray-500">{product.seller.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
