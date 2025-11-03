"use client"

import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { PRODUCTS } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { ArrowRight, Zap, Truck, Shield, Heart } from "lucide-react"

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 8)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Made Cute */}
      <section className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -ml-48 -mb-48"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Welcome to <span className="text-white drop-shadow-lg">ShopHub</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-balance opacity-95 max-w-2xl mx-auto">
            Discover 110+ amazing products at unbeatable prices. Your shopping paradise awaits!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:shadow-lg transition transform hover:scale-105"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/wishlist"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground/20 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-foreground/30 transition backdrop-blur"
            >
              <Heart className="w-5 h-5" />
              View Wishlist
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Cute Cards */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Why Shop With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Fast & Free Shipping</h3>
              <p className="text-muted-foreground">Quick delivery on orders over ₹4000. Express options available!</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">100% Secure</h3>
              <p className="text-muted-foreground">
                Your transactions are encrypted and protected. Shop with confidence!
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Easy Returns</h3>
              <p className="text-muted-foreground">Not satisfied? Hassle-free returns within 30 days guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked favorites just for you</p>
            </div>
            <Link href="/products" className="text-primary hover:underline font-semibold flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Browse our complete collection of {PRODUCTS.length}+ products across Electronics, Fashion, Home & Kitchen,
            and Books. Find exactly what you're looking for!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:shadow-lg transition transform hover:scale-105"
          >
            Explore Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-lg">About ShopHub</h4>
              <p className="text-sm opacity-80">
                Your trusted online shopping destination with 110+ products across multiple categories. Quality
                products, great prices, exceptional service.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products" className="opacity-80 hover:opacity-100 transition">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="opacity-80 hover:opacity-100 transition">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" className="opacity-80 hover:opacity-100 transition">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="opacity-80 hover:opacity-100 transition">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="opacity-80 hover:opacity-100 transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="opacity-80 hover:opacity-100 transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="opacity-80 hover:opacity-100 transition">
                    Shipping Info
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="opacity-80 hover:opacity-100 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="opacity-80 hover:opacity-100 transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2025 ShopHub. All rights reserved. Made with love for shoppers! ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
