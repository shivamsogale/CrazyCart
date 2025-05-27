import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  date: string
  total: number
  status: 'processing' | 'shipped' | 'delivered'
  items: OrderItem[]
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    pincode: string
  }
  paymentMethod: 'card' | 'upi'
}

interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrder: (id: string) => Order | undefined
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ 
        orders: [order, ...state.orders] 
      })),
      getOrder: (id) => get().orders.find(order => order.id === id),
    }),
    {
      name: 'orders-storage',
    }
  )
) 