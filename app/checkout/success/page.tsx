"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, Truck, ShoppingBag, FileText } from "lucide-react"
import { useOrderStore } from "@/lib/store/orders"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import confetti from 'canvas-confetti'

export default function SuccessPage() {
  const router = useRouter()
  const addOrder = useOrderStore((state) => state.addOrder)
  const supabase = createClient()
  
  // Generate a random order number
  const orderNumber = `ON${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`

  useEffect(() => {
    const createOrderAndClearCart = async () => {
      try {
        // Get user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Get cart items
        const { data: cartItems } = await supabase
          .from("cart_items")
          .select(`
            *,
            product:products(*)
          `)
          .eq("user_id", user.id)

        if (!cartItems || cartItems.length === 0) return

        // Create order
        const order = {
          id: orderNumber,
          date: new Date().toISOString(),
          total: cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0),
          status: 'processing' as const,
          items: cartItems.map(item => ({
            id: item.product?.id || '',
            name: item.product?.name || '',
            price: item.product?.price || 0,
            quantity: item.quantity,
          })),
          shippingAddress: {
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001'
          },
          paymentMethod: 'card' as const
        }

        // Add order to store
        addOrder(order)

        // Clear cart items
        await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", user.id)

        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })

        router.refresh()
      } catch (error) {
        console.error("Error processing order:", error)
      }
    }

    createOrderAndClearCart()
  }, [addOrder, orderNumber, router, supabase])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        className="max-w-2xl mx-auto text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="mb-8" variants={item}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
            <CheckCircle2 className="w-16 h-16 text-green-500 relative" />
          </div>
          <h1 className="text-3xl font-bold mb-4 mt-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <p className="text-gray-600">
            Order number: <span className="font-semibold">{orderNumber}</span>
          </p>
        </motion.div>

        <motion.div 
          className="bg-white p-8 rounded-lg shadow-sm mb-8"
          variants={item}
        >
          <h2 className="text-xl font-semibold mb-6">What's Next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.02 }}
              variants={item}
            >
              <Package className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-medium mb-2">Order Processing</h3>
              <p className="text-sm text-gray-600 text-center">
                We're preparing your order for shipment. You'll receive an email once it's ready.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.02 }}
              variants={item}
            >
              <Truck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-medium mb-2">Delivery Expected</h3>
              <p className="text-sm text-gray-600 text-center">
                Your order should arrive within 3-5 business days.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={item}
        >
          <Link href="/products">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Button>
          </Link>
          <Link href="/account/orders">
            <Button className="w-full sm:w-auto flex items-center gap-2">
              <FileText className="w-4 h-4" />
              View Order
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
} 