"use client"

import { useState, useMemo, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useApp, type Product } from "@/store"
import ProductCard from "@/product-card"

const categoryNames: Record<string, string> = {
  electronics: "Electronics",
  vehicles: "Vehicles",
  "home-garden": "Home & Garden",
  fashion: "Fashion",
  gaming: "Gaming",
  books: "Books",
  sports: "Sports",
  "baby-kids": "Baby & Kids",
  "donate-giveaway": "Donate/Giveaway",
  "moving-out": "Moving Out",
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { state } = useApp() // Use state instead of products directly
  const router = useRouter()
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categoryProducts = useMemo(() => {
    console.log("[v0] Category page - slug:", slug)
    console.log("[v0] Available products:", state.products?.length || 0)

    if (!state.products) {
      console.log("[v0] No products available in state")
      return []
    }

    console.log(
      "[v0] All product categories:",
      state.products.map((p) => p.category),
    )

    const filtered = state.products.filter((product: Product) => {
      const matches = product.category === slug
      console.log("[v0] Product:", product.title, "Category:", product.category, "Matches:", matches)
      return matches
    })

    console.log("[v0] Filtered products for category", slug, ":", filtered.length)

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
        default:
          return b.id - a.id
      }
    })
  }, [state.products, slug, sortBy])

  const categoryName = categoryNames[slug] || slug.replace("-", " ")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">{categoryName}</h1>
              <p className="text-gray-600 dark:text-gray-300">{categoryProducts.length} items available</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Options */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Special Category Badges */}
        {slug === "donate-giveaway" && (
          <div className="mb-6">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Free Items - Community Donations
            </Badge>
          </div>
        )}

        {slug === "moving-out" && (
          <div className="mb-6">
            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              Urgent Sales - Great Deals
            </Badge>
          </div>
        )}

        {/* Products Grid/List */}
        {categoryProducts.length > 0 ? (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {categoryProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Filter className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              No items found in {categoryName}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Be the first to list an item in this category!</p>
            <Button onClick={() => router.push("/sell")}>List Your Item</Button>
          </div>
        )}
      </div>
    </div>
  )
}
