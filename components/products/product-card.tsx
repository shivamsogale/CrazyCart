"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/supabase/types"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ShoppingCart, Check, Heart } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const addToCart = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      toast.error("Please sign in to add items to cart")
      router.push("/auth")
      return
    }

    setIsAdding(true)

    try {
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .single()

      if (existingItem) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + 1 })
          .eq("id", existingItem.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
        })

        if (error) throw error
      }

      setIsAdded(true)
      toast.success("Added to cart!")

      setTimeout(() => {
        setIsAdded(false)
      }, 2000)
    } catch (error: any) {
      toast.error("Failed to add to cart")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image_url || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`h-4 w-4 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </Button>

        {/* Quick View Button */}
        <Button
          variant="ghost"
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
        >
          Quick View
        </Button>
      </div>

      <CardContent className="p-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-black">₹{product.price.toFixed(2)}</p>
            {product.stock_quantity > 0 ? (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">In Stock</span>
            ) : (
              <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Out of Stock</span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          onClick={addToCart}
          className={`w-full transition-all duration-500 rounded-full font-semibold ${
            isAdded
              ? "bg-green-600 hover:bg-green-700 scale-105 shadow-lg"
              : isAdding
                ? "scale-95"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-lg"
          }`}
          disabled={product.stock_quantity === 0 || isAdding}
        >
          <div className="flex items-center justify-center space-x-2">
            {isAdding ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Adding...</span>
              </>
            ) : isAdded ? (
              <>
                <Check className="h-4 w-4 animate-bounce" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </>
            )}
          </div>
        </Button>
      </CardFooter>
    </Card>
  )
}
