"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { getCart, removeFromCart, updateCartQuantity, clearCart, getCartTotal } from "@/lib/cart"
import type { CartItem } from "@/lib/data"
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setCart(getCart())
    setTotal(getCartTotal())
  }, [])

  const handleRemove = (id: number) => {
    removeFromCart(id)
    const updated = getCart()
    setCart(updated)
    setTotal(getCartTotal())
  }

  const handleQuantityChange = (id: number, quantity: number) => {
    updateCartQuantity(id, quantity)
    const updated = getCart()
    setCart(updated)
    setTotal(getCartTotal())
  }

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart()
      setCart([])
      setTotal(0)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some products to get started!</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:opacity-90 transition"
            >
              Continue Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-md overflow-hidden">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-6 border-b border-border last:border-b-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-semibold text-lg hover:text-primary transition">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                      <p className="text-lg font-bold text-primary mb-3">₹{item.price.toFixed(0)}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-muted"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-muted"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="ml-auto text-destructive hover:bg-destructive/10 p-2 rounded-lg transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{(item.price * item.quantity).toFixed(0)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleClearCart} className="mt-4 text-destructive hover:underline font-semibold">
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{total.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">{total > 4000 ? "Free" : "₹829"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">₹{(total * 0.1).toFixed(0)}</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{(total + (total > 4000 ? 0 : 829) + total * 0.1).toFixed(0)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition block text-center"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/products"
                  className="w-full mt-3 border border-border py-3 rounded-lg font-bold hover:bg-muted transition text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
