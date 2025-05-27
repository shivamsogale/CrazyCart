"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import CartItemActions from "@/components/cart/cart-item-actions"
import { formatCurrency } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { getCartItems } from "@/lib/cart"
import type { CartItem } from "@/lib/types"

export default function CartPage() {
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems()
        setCartItems(items || [])
      } catch (error) {
        console.error("Error fetching cart items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [])

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity
  }, 0)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 h-32 rounded-lg"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="bg-gray-50 p-8 rounded-lg">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some products to get started!</p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 relative">
                        <Image
                          src={item.product?.image_url || "/placeholder.svg?height=80&width=80"}
                          alt={item.product?.name || "Product"}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product?.name}</h3>
                        <p className="text-muted-foreground">{formatCurrency(item.product?.price || 0)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CartItemActions item={item} />
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency((item.product?.price || 0) * item.quantity)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
