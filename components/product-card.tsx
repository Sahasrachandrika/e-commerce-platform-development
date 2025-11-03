"use client"

import type { Product } from "@/lib/data"
import { addToCart, addToWishlist, removeFromWishlist, isInWishlist } from "@/lib/cart"
import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useState, useEffect } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false)
  const [wishlistAdded, setWishlistAdded] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id))
  }, [product.id])

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
      setIsWishlisted(false)
      setWishlistAdded(false)
    } else {
      addToWishlist(product)
      setIsWishlisted(true)
      setWishlistAdded(true)
      setTimeout(() => setWishlistAdded(false), 1500)
    }
  }

  return (
    <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition overflow-hidden flex flex-col h-full relative">
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
      </button>

      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-muted h-48">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg hover:text-primary transition line-clamp-2">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="mt-auto">
          <p className="text-2xl font-bold text-primary mb-3">₹{product.price.toFixed(0)}</p>
          {wishlistAdded && <p className="text-xs text-red-500 mb-2 text-center animate-pulse">Added to wishlist!</p>}
          <button
            onClick={handleAddToCart}
            className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              added ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  )
}
