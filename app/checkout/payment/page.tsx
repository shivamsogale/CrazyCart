"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Smartphone } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push("/checkout/success")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Payment</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card" className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Card Payment
                </TabsTrigger>
                <TabsTrigger value="upi" className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  UPI Payment
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          placeholder="1234 5678 9012 3456"
                          required 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input 
                            id="expiry" 
                            placeholder="MM/YY"
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv" 
                            type="password" 
                            maxLength={3}
                            placeholder="123"
                            required 
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input 
                          id="cardName" 
                          placeholder="John Doe"
                          required 
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Processing Payment..." : "Pay ₹58,999"}
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="upi">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input 
                          id="upiId" 
                          placeholder="username@upi"
                          required 
                        />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Popular UPI Apps</h3>
                        <RadioGroup defaultValue="gpay">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="gpay" id="gpay" />
                              <Label htmlFor="gpay">Google Pay</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="phonepe" id="phonepe" />
                              <Label htmlFor="phonepe">PhonePe</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="paytm" id="paytm" />
                              <Label htmlFor="paytm">Paytm</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Processing Payment..." : "Pay ₹58,999"}
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
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