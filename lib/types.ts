export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string | null
  stock_quantity: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  role: "user" | "admin"
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shipping_address: any
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
  product?: Product
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  product?: Product
}
