"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { Smartphone, Car, Home, Shirt, Gamepad2, Book, Dumbbell, Baby, Heart, Truck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    slug: "electronics",
    color: "from-blue-500 to-cyan-500",
    href: "/category/electronics",
  },
  {
    name: "Vehicles",
    icon: Car,
    slug: "vehicles",
    color: "from-red-500 to-pink-500",
    href: "/category/vehicles",
  },
  {
    name: "Home & Garden",
    icon: Home,
    slug: "home-garden",
    color: "from-green-500 to-emerald-500",
    href: "/category/home-garden",
  },
  {
    name: "Fashion",
    icon: Shirt,
    slug: "fashion",
    color: "from-purple-500 to-violet-500",
    href: "/category/fashion",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    slug: "gaming",
    color: "from-orange-500 to-yellow-500",
    href: "/category/gaming",
  },
  {
    name: "Books",
    icon: Book,
    slug: "books",
    color: "from-indigo-500 to-blue-500",
    href: "/category/books",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    slug: "sports",
    color: "from-teal-500 to-green-500",
    href: "/category/sports",
  },
  {
    name: "Baby & Kids",
    icon: Baby,
    slug: "baby-kids",
    color: "from-pink-500 to-rose-500",
    href: "/category/baby-kids",
  },
  {
    name: "Donate/Giveaway",
    icon: Heart,
    slug: "donate-giveaway",
    color: "from-emerald-500 to-green-500",
    href: "/category/donate-giveaway",
  },
  {
    name: "Moving Out",
    icon: Truck,
    slug: "moving-out",
    color: "from-red-500 to-orange-500",
    href: "/category/moving-out",
  },
]

export default function FeaturedCategories() {
  const router = useRouter()

  const getCategoryCount = (categorySlug: string) => {
    // For now, return a placeholder count. This will be updated when we integrate with Supabase
    return 0
  }

  const handleCategoryClick = useCallback(
    (href: string) => {
      // Preserve scroll position
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop

      router.push(href)

      // Restore scroll position
      setTimeout(() => {
        window.scrollTo({ top: currentScroll, behavior: "auto" })
      }, 0)
    },
    [router],
  )

  const handleViewAllClick = useCallback(() => {
    // Preserve scroll position
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop

    router.push("/categories")

    // Restore scroll position
    setTimeout(() => {
      window.scrollTo({ top: currentScroll, behavior: "auto" })
    }, 0)
  }, [router])

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Browse by Category</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find exactly what you're looking for in our organized categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            const productCount = getCategoryCount(category.slug)
            const displayCount =
              productCount > 0 ? `${productCount} item${productCount !== 1 ? "s" : ""}` : "No items yet"

            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-transparent prevent-layout-shift"
                onClick={() => handleCategoryClick(category.href)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{displayCount}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="group bg-transparent focus-no-scroll"
            onClick={handleViewAllClick}
          >
            <span className="flex items-center">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  )
}
