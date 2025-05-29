import { Suspense } from "react"
import { SkeletonCard } from "@/components/ui/skeleton-card"
import OrdersClient from "./orders-client"

// This is a server component
export default function OrdersPage() {
  return (
    <Suspense 
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      }
    >
      <OrdersClient />
    </Suspense>
  )
} 