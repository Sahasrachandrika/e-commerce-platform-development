"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { getWishlist, removeFromWishlist, addToCart } from "@/lib/cart"
import Link from "next/link"
import { Heart, ShoppingCart, ArrowRight, Trash2 } from "lucide-react"
import type { Product } from "@/lib/data"

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setWishlist(getWishlist())
    setLoading(false)

    const handleStorageChange = () => {
      setWishlist(getWishlist())
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleRemove = (productId: number) => {
    removeFromWishlist(productId)
    setWishlist(getWishlist())
  }

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <h1 className="text-4xl font-bold">My Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-card rounded-lg shadow-md p-12 text-center">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Add products to your wishlist to save them for later!</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Continue Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-lg shadow-md p-6 flex items-center gap-6 hover:shadow-lg transition"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <Link href={`/product/${product.id}`} className="text-xl font-bold hover:text-primary transition">
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <p className="text-2xl font-bold text-primary">₹{product.price.toFixed(0)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
