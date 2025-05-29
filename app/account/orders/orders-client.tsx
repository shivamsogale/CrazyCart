"use client"

import { useState, useEffect } from "react"
import { useOrderStore } from "@/lib/store/orders"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Truck, CheckCircle, Search, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { SkeletonCard } from "@/components/ui/skeleton-card"
import { motion } from "framer-motion"

export default function OrdersClient() {
  const { orders } = useOrderStore()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Package className="w-4 h-4" />
      case 'shipped':
        return <Truck className="w-4 h-4" />
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime()
      if (sortBy === "highest") return b.total - a.total
      return a.total - b.total
    })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <Link href="/products">
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-gray-50 p-8 rounded-lg">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-4">No orders yet</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't placed any orders yet.</p>
              <Link href="/products">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Amount</SelectItem>
                    <SelectItem value="lowest">Lowest Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Badge 
                          variant="secondary" 
                          className={`flex items-center gap-2 ${getStatusColor(order.status)}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-medium">₹{item.price.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 mt-4 pt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Total Amount</p>
                            <p className="text-sm text-gray-600">Paid via {order.paymentMethod.toUpperCase()}</p>
                          </div>
                          <p className="text-xl font-bold">₹{order.total.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 mt-4 pt-4">
                        <p className="font-medium mb-2">Shipping Address</p>
                        <p className="text-sm text-gray-600">
                          {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{order.shippingAddress.address}</p>
                        <p className="text-sm text-gray-600">
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}