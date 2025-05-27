"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { Product } from "@/lib/types"

interface ProductFormProps {
  product?: Product
}

export default function ProductForm({ product }: ProductFormProps) {
  const [name, setName] = useState(product?.name || "")
  const [description, setDescription] = useState(product?.description || "")
  const [price, setPrice] = useState(product?.price?.toString() || "")
  const [category, setCategory] = useState(product?.category || "")
  const [stockQuantity, setStockQuantity] = useState(product?.stock_quantity?.toString() || "")
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const supabase = createClient()

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, file)

    if (uploadError) {
      console.error("Error uploading image:", uploadError)
      return null
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(filePath)

    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      let imageUrl = product?.image_url || null

      if (image) {
        imageUrl = await uploadImage(image)
        if (!imageUrl) {
          setError("Failed to upload image")
          setLoading(false)
          return
        }
      }

      const productData = {
        name,
        description,
        price: Number.parseFloat(price),
        category,
        stock_quantity: Number.parseInt(stockQuantity),
        image_url: imageUrl,
      }

      if (product) {
        const { error } = await supabase.from("products").update(productData).eq("id", product.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("products").insert(productData)

        if (error) throw error
      }

      router.push("/admin/products")
      router.refresh()
    } catch (error: any) {
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{product ? "Edit Product" : "Add New Product"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input
                id="stockQuantity"
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <Input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
