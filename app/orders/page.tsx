import { createClient } from "@/lib/supabase/server"
import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import type { OrderItem } from "@/lib/types"

export default async function OrdersPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  const supabase = await createClient()

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(
        *,
        product:products(*)
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
          <p className="text-muted-foreground">Your order history will appear here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                  <p className="text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <Badge variant={order.status === "delivered" ? "default" : "secondary"}>{order.status}</Badge>
                  <p className="font-semibold mt-1">{formatCurrency(order.total_amount)}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {order.order_items?.map((item: OrderItem) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.product?.name}</span>
                      <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                    </div>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
