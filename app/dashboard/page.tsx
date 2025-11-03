"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { getCurrentUser } from "@/lib/auth"
import { getOrders } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Package, LogOut, Heart, ShoppingCart } from "lucide-react"
import { logoutUser } from "@/lib/auth"
import { getWishlist } from "@/lib/cart"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [wishlistCount, setWishlistCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
    } else {
      setUser(currentUser)
      const userOrders = getOrders()
      setOrders(userOrders)
      const wishlist = getWishlist()
      setWishlistCount(wishlist.length)
    }
  }, [router])

  const handleLogout = () => {
    logoutUser()
    router.push("/")
  }

  if (!user) {
    return null
  }

  const totalSpent = orders.reduce((sum: number, order: any) => sum + order.total, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* User Info Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-primary to-accent rounded-lg shadow-md p-6 text-primary-foreground">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary-foreground rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="opacity-90">{user.email}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p>Member since {new Date().toLocaleDateString()}</p>
              <p>Total Orders: {orders.length}</p>
              <p>Total Spent: ₹{totalSpent.toFixed(0)}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <Package className="w-6 h-6 text-primary" />
              <h3 className="font-bold">Orders</h3>
            </div>
            <p className="text-3xl font-bold text-primary">{orders.length}</p>
            <Link href="/orders" className="text-sm text-primary hover:underline mt-3 inline-block">
              View All Orders
            </Link>
          </div>

          <div className="bg-card rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-6 h-6 text-red-500" />
              <h3 className="font-bold">Wishlist</h3>
            </div>
            <p className="text-3xl font-bold text-red-500">{wishlistCount}</p>
            <Link href="/wishlist" className="text-sm text-primary hover:underline mt-3 inline-block">
              View Wishlist
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/products" className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
            <ShoppingCart className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">Continue Shopping</h3>
            <p className="text-sm text-muted-foreground">Browse our collection</p>
          </Link>

          <Link href="/orders" className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
            <Package className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">My Orders</h3>
            <p className="text-sm text-muted-foreground">Track your purchases</p>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition text-center border border-destructive"
          >
            <LogOut className="w-8 h-8 text-destructive mx-auto mb-3" />
            <h3 className="font-bold mb-2 text-destructive">Logout</h3>
            <p className="text-sm text-muted-foreground">Sign out of your account</p>
          </button>
        </div>

        {/* Recent Orders */}
        {orders.length > 0 && (
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {orders
                .slice(-3)
                .reverse()
                .map((order: any) => (
                  <div key={order.id} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
                    <p className="text-primary font-bold mt-2">₹{order.total.toFixed(0)}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
