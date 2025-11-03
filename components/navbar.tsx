"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { getCurrentUser, logoutUser } from "@/lib/auth"
import { getCart, getWishlist } from "@/lib/cart"
import type { User } from "@/lib/data"
import { ShoppingCart, LogOut, UserIcon, Menu, X, Heart } from "lucide-react"

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setUser(getCurrentUser())
    setCartCount(getCart().length)
    setWishlistCount(getWishlist().length)

    const handleStorageChange = () => {
      setUser(getCurrentUser())
      setCartCount(getCart().length)
      setWishlistCount(getWishlist().length)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleLogout = () => {
    logoutUser()
    setUser(null)
    setMobileOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ShoppingCart className="w-6 h-6" />
            ShopHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="hover:opacity-80 transition">
              Products
            </Link>
            <Link href="/wishlist" className="flex items-center gap-2 hover:opacity-80 transition">
              <Heart className="w-5 h-5" />
              Wishlist{" "}
              {wishlistCount > 0 && (
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="flex items-center gap-2 hover:opacity-80 transition">
              <ShoppingCart className="w-5 h-5" />
              Cart{" "}
              {cartCount > 0 && (
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/orders" className="flex items-center gap-2 hover:opacity-80 transition">
                  <UserIcon className="w-5 h-5" />
                  My Orders
                </Link>
                <Link href="/dashboard" className="hover:opacity-80 transition">
                  {user.name}
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 hover:opacity-80 transition">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="hover:opacity-80 transition">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="/products" className="block hover:opacity-80 transition">
              Products
            </Link>
            <Link href="/wishlist" className="flex items-center gap-2 hover:opacity-80 transition">
              <Heart className="w-5 h-5" />
              Wishlist{" "}
              {wishlistCount > 0 && (
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="flex items-center gap-2 hover:opacity-80 transition">
              <ShoppingCart className="w-5 h-5" />
              Cart{" "}
              {cartCount > 0 && (
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="space-y-3">
                <Link href="/orders" className="flex items-center gap-2 hover:opacity-80 transition">
                  <UserIcon className="w-5 h-5" />
                  My Orders
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
                  <UserIcon className="w-5 h-5" />
                  {user.name}
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 hover:opacity-80 transition w-full">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/login" className="block hover:opacity-80 transition">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:opacity-90 transition text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
