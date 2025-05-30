"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // If user directly accesses this page without checkout, redirect to home
    if (!document.referrer.includes("/payment")) {
      router.push("/")
    }
  }, [router])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center">✓</div>
            <div className="h-1 w-16 bg-green-600 mx-2"></div>
            <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center">✓</div>
            <div className="h-1 w-16 bg-green-600 mx-2"></div>
            <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center">✓</div>
          </div>
        </div>

        <Card className="text-center py-12">
          <CardContent>
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="h-24 w-24 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Thank You for Your Order!</h2>
            <p className="text-gray-600 mb-8">
              Your order has been successfully placed. We'll send you an email confirmation with order details shortly.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => router.push("/orders")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
              >
                View Orders
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/products")}
                className="px-8"
              >
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 