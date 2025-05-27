"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { addToCart } from "@/lib/cart"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
}

export default function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    setLoading(true)

    try {
      await addToCart(product, quantity)

      // Show success state
      setAdded(true)
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })

      router.refresh()
    } catch (error) {
      if (error instanceof Error && error.message === "User not authenticated") {
        router.push("/login")
      } else {
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      // Reset after animation
      setTimeout(() => {
        setAdded(false)
        setLoading(false)
      }, 1500)
    }
  }

  return (
    <Button 
      onClick={handleAddToCart} 
      disabled={loading} 
      className="w-full relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.div
            key="success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-green-500"
          >
            <Check className="w-5 h-5 text-white" />
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center w-full"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {loading ? "Adding..." : "Add to Cart"}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}
