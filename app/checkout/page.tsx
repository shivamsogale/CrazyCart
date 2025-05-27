"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push("/checkout/payment")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required />
                    </div>
                    <div>
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input id="pincode" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" required />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard Delivery (3-5 business days) - Free</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express">Express Delivery (1-2 business days) - ₹199</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Proceed to Payment"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹49,999</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹9,000</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹58,999</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 