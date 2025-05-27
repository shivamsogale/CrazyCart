import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import AddToCartButton from "@/components/cart/add-to-cart-button"
import { formatCurrency } from "@/lib/utils"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase.from("products").select("*").eq("id", id).eq("is_active", true).single()

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square relative">
          <Image
            src={product.image_url || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</p>
          </div>

          {product.description && (
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          )}

          <div className="space-y-2">
            <p>
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p>
              <span className="font-semibold">Stock:</span> {product.stock_quantity} available
            </p>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
