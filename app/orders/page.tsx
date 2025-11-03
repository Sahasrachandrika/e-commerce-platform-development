"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { getCurrentUser } from "@/lib/auth"
import { getOrders } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Package, ArrowRight } from "lucide-react"

export default function OrdersPage() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
    } else {
      setUser(currentUser)
      const userOrders = getOrders()
      setOrders(userOrders)
    }
  }, [router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-card rounded-lg shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping and your orders will appear here!</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div key={order.id} className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="font-semibold">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total</p>
                    <p className="text-xl font-bold text-primary">₹{order.total.toFixed(0)}</p>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold mb-3">Items ({order.items.length})</p>
                  <div className="space-y-2">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
