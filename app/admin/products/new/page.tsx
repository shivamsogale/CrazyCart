import { isAdmin } from "@/lib/auth"
import { redirect } from "next/navigation"
import ProductForm from "@/components/admin/product-form"

export default async function NewProductPage() {
  const adminCheck = await isAdmin()

  if (!adminCheck) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <ProductForm />
    </div>
  )
}
