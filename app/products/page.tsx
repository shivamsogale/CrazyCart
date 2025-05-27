import { createClient } from "@/lib/supabase/server"
import ProductList from "@/components/products/product-list"

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const supabase = await createClient()
  const searchQuery = typeof searchParams.q === "string" ? searchParams.q : undefined

  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)

  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`
    )
  }

  const { data: products } = await query.order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
      </h1>
      <ProductList products={products || []} />
    </div>
  )
}
