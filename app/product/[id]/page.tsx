"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { PRODUCTS } from "@/lib/data"
import { addToCart } from "@/lib/cart"
import { Star, ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === Number.parseInt(params.id))
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [liked, setLiked] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products" className="text-primary hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <span>/</span>
          <span>{product.category}</span>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="bg-card rounded-lg overflow-hidden">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-96 object-cover" />
          </div>

          {/* Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-5xl font-bold text-primary mb-2">₹{product.price.toFixed(0)}</p>
              <p className="text-muted-foreground">Free shipping on orders over ₹4000</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-muted">
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-muted">
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                  added ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`px-4 py-3 rounded-lg border transition ${
                  liked ? "bg-red-50 border-red-300 text-red-600" : "border-border hover:border-primary"
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span>
                In stock and ready to ship
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span>
                30-day money-back guarantee
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span>
                Secure checkout with SSL encryption
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer">
                    <div className="bg-muted h-40 overflow-hidden">
                      <img
                        src={p.image || "/placeholder.svg"}
                        alt={p.name}
                        className="w-full h-full object-cover hover:scale-105 transition"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-2 mb-2">{p.name}</h3>
                      <p className="text-xl font-bold text-primary">₹{p.price.toFixed(0)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
