"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { getCart, getCartTotal, clearCart } from "@/lib/cart"
import { getCurrentUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function CheckoutPage() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)

    const cartItems = getCart()
    if (cartItems.length === 0) {
      router.push("/cart")
      return
    }

    setCart(cartItems)
    setTotal(getCartTotal())
    setFormData((prev) => ({
      ...prev,
      firstName: currentUser.name.split(" ")[0],
      lastName: currentUser.name.split(" ")[1] || "",
      email: currentUser.email,
    }))
  }, [router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      setOrderPlaced(true)
      setLoading(false)
    }, 2000)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <div className="bg-card rounded-lg shadow-md p-8 mb-8 text-left">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="space-y-2 text-sm mb-6">
              <p>
                <span className="text-muted-foreground">Order ID:</span>{" "}
                <span className="font-semibold">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Items:</span>{" "}
                <span className="font-semibold">{cart.length}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Total:</span>{" "}
                <span className="font-semibold text-lg text-primary">
                  ₹{(total + (total > 4000 ? 0 : 829) + total * 0.1).toFixed(0)}
                </span>
              </p>
              <p>
                <span className="text-muted-foreground">Estimated Delivery:</span>{" "}
                <span className="font-semibold">5-7 business days</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:opacity-90 transition"
            >
              View Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 border border-border px-8 py-3 rounded-lg font-bold hover:bg-muted transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!user || cart.length === 0) {
    return null
  }

  const shippingCost = total > 4000 ? 0 : 829
  const tax = total * 0.1
  const finalTotal = total + shippingCost + tax

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-card rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="md:col-span-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="md:col-span-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street Address"
                    className="md:col-span-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="ZIP Code"
                    className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-card rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Card Number"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="CVV"
                      className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">₹{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">{shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(0)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-semibold">₹{tax.toFixed(0)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{finalTotal.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
