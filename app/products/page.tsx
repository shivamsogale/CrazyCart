import { createServerClient } from "@/lib/supabase/server"
import ProductCard from "@/components/products/product-card"

interface ProductsPageProps {
  searchParams: { search?: string; category?: string }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const supabase = createServerClient()
  const { search, category } = searchParams

  try {
    let query = supabase.from("products").select("*").eq("is_active", true)

    // Add search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Add category filter
    if (category) {
      query = query.eq("category", category)
    }

    const { data: products, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
    }

    console.log("Products page - fetched:", products?.length || 0)

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {search ? `Search results for "${search}"` : category ? `${category} Products` : "All Products"}
          </h1>
          {products && products.length > 0 && <p className="text-gray-600 mt-2">{products.length} products found</p>}
        </div>

        {error && <div className="text-center text-red-600 mb-8">Error loading products: {error.message}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!products?.length && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {search ? `No products found for "${search}"` : "No products available at the moment."}
            </p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Products page error:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    )
  }
}
