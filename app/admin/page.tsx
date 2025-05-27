import { isAdmin } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { formatCurrency } from "@/lib/utils"

export default async function AdminPage() {
  const adminCheck = await isAdmin()

  if (!adminCheck) {
    redirect("/")
  }

  const supabase = await createClient()

  const [{ count: productsCount }, { count: ordersCount }, { data: recentOrders }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*, profiles(full_name)").order("created_at", { ascending: false }).limit(5),
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Total products in store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">{productsCount}</span>
              <Button asChild variant="outline">
                <Link href="/admin/products">Manage Products</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Total orders received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">{ordersCount}</span>
              <Button asChild variant="outline">
                <Link href="/admin/orders">View Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders && recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">{order.profiles?.full_name || "Unknown Customer"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(order.total_amount)}</p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No recent orders</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
