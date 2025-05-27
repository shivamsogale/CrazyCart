"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import type { CartItem } from "@/lib/types"
import { updateCartItemQuantity, removeFromCart } from "@/lib/cart"

interface CartItemActionsProps {
  item: CartItem
}

export default function CartItemActions({ item }: CartItemActionsProps) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return

    setLoading(true)
    try {
      await updateCartItemQuantity(item.id, newQuantity)
      setQuantity(newQuantity)
      router.refresh()
    } catch (error) {
      console.error("Error updating quantity:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveItem = async () => {
    setLoading(true)
    try {
      await removeFromCart(item.id)
      router.refresh()
    } catch (error) {
      console.error("Error removing item:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleUpdateQuantity(Math.max(1, quantity - 1))}
        disabled={loading || quantity <= 1}
      >
        -
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={(e) => {
          const newQuantity = Number.parseInt(e.target.value)
          if (newQuantity > 0) {
            setQuantity(newQuantity)
            handleUpdateQuantity(newQuantity)
          }
        }}
        className="w-16 text-center"
        min="1"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleUpdateQuantity(quantity + 1)}
        disabled={loading}
      >
        +
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRemoveItem}
        disabled={loading}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
