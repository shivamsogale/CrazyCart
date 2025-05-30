"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

export default function PaymentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    // Check if shipping details exist
    const shippingDetails = localStorage.getItem("shippingDetails")
    if (!shippingDetails) {
      router.push("/checkout")
    }

    // Get cart total
    const getCartTotal = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth")
        return
      }

      const { data: cartItems } = await supabase
        .from("cart_items")
        .select("quantity, product:products(price)")
        .eq("user_id", user.id)

      if (cartItems) {
        const total = cartItems.reduce((sum, item) => {
          return sum + (item.quantity * (item.product?.price || 0))
        }, 0)
        setTotal(total)
      }
    }

    getCartTotal()
  }, [router, supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Format card number with spaces
    if (e.target.name === "cardNumber") {
      value = value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ") || ""
    }
    
    // Format expiry date
    if (e.target.name === "expiryDate") {
      value = value.replace(/\D/g, "").match(/(\d{0,2})(\d{0,2})/)?.slice(1).filter(Boolean).join("/") || ""
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Get user and cart items
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const shippingDetails = JSON.parse(localStorage.getItem("shippingDetails") || "{}")

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: total,
          status: "pending",
          shipping_address: JSON.stringify(shippingDetails),
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Get cart items
      const { data: cartItems } = await supabase
        .from("cart_items")
        .select("product_id, quantity, product:products(price)")
        .eq("user_id", user.id)

      if (!cartItems) throw new Error("No items in cart")

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product?.price || 0,
      }))

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Clear cart
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)

      // Clear shipping details
      localStorage.removeItem("shippingDetails")

      // Redirect to success page
      router.push("/success")
    } catch (error) {
      console.error("Payment error:", error)
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Payment</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center">✓</div>
            <div className="h-1 w-16 bg-purple-600 mx-2"></div>
            <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center">2</div>
            <div className="h-1 w-16 bg-gray-200 mx-2"></div>
            <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center">3</div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              <div className="flex justify-between items-center">
                <span>Total Amount:</span>
                <span className="text-2xl font-bold">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Card Number</label>
                  <Input
                    required
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cardholder Name</label>
                  <Input
                    required
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Date</label>
                    <Input
                      required
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVV</label>
                    <Input
                      required
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 