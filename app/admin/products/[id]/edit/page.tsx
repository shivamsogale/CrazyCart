import { isAdmin } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ProductForm from "@/components/admin/product-form"

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const adminCheck = await isAdmin()

  if (!adminCheck) {
    redirect("/")
  }

  const supabase = await createClient()

  const { data: product } = await supabase.from("products").select("*").eq("id", id).single()

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  )
}
