import { createClient } from "@/lib/supabase/client"
import type { CartItem, Product } from "@/lib/types"

export async function getCartItems() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: cartItems } = await supabase
    .from("cart_items")
    .select(`
      *,
      product:products(*)
    `)
    .eq("user_id", user.id)

  return cartItems
}

export async function getCartCount() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 0

  const { data: cartItems } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("user_id", user.id)

  return cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0
}

export async function addToCart(product: Product, quantity: number = 1) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("User not authenticated")

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", product.id)
    .single()

  if (existingItem) {
    await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id)
  } else {
    await supabase.from("cart_items").insert({
      user_id: user.id,
      product_id: product.id,
      quantity,
    })
  }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  const supabase = createClient()
  
  await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", itemId)
}

export async function removeFromCart(itemId: string) {
  const supabase = createClient()
  
  await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId)
}

export async function clearCart(userId: string) {
  const supabase = createClient()
  
  await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
} 