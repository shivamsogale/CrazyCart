import { isAdmin } from "@/lib/auth"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

export default async function AdminProductsPage() {
  const adminCheck = await isAdmin()

  if (!adminCheck) {
    redirect("/")
  }

  const supabase = await createClient()

  const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">Add New Product</Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 relative">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=80&width=80"}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="font-semibold">{formatCurrency(product.price)}</span>
                    <span className="text-sm text-muted-foreground">Stock: {product.stock_quantity}</span>
                    <Badge variant={product.is_active ? "default" : "secondary"}>
                      {product.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button asChild variant="outline">
                    <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
