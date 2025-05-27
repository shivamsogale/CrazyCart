"use client"

import { useState, useEffect } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { getCartCount } from "@/lib/cart"

export default function CartButton() {
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const fetchCartCount = async () => {
      const count = await getCartCount()
      setTotalItems(count)
    }

    // Initial fetch
    fetchCartCount()

    // Set up polling every 2 seconds
    const interval = setInterval(fetchCartCount, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Button asChild variant="ghost" size="icon" className="relative">
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </Button>
  )
}
