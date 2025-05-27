import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import AddToCartButton from "../cart/add-to-cart-button"
import { formatCurrency } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative">
          <Image
            src={product.image_url || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
        <p className="text-2xl font-bold">{formatCurrency(product.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  )
}
