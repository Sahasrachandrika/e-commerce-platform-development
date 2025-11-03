// Shopping cart management
import type { CartItem } from "./data"

const CART_KEY = "ecommerce_cart"

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(product: CartItem): void {
  const cart = getCart()
  const existingItem = cart.find((item) => item.id === product.id)
  if (existingItem) {
    existingItem.quantity += product.quantity
  } else {
    cart.push(product)
  }
  saveCart(cart)
}

export function removeFromCart(productId: number): void {
  const cart = getCart()
  const filtered = cart.filter((item) => item.id !== productId)
  saveCart(filtered)
}

export function updateCartQuantity(productId: number, quantity: number): void {
  const cart = getCart()
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity = Math.max(1, quantity)
    saveCart(cart)
  }
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY)
}

export function getCartTotal(): number {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

const WISHLIST_KEY = "ecommerce_wishlist"

export function getWishlist() {
  if (typeof window === "undefined") return []
  const wishlist = localStorage.getItem(WISHLIST_KEY)
  return wishlist ? JSON.parse(wishlist) : []
}

export function saveWishlist(wishlist: any[]): void {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
}

export function addToWishlist(product: any): void {
  const wishlist = getWishlist()
  const exists = wishlist.find((item: any) => item.id === product.id)
  if (!exists) {
    wishlist.push(product)
    saveWishlist(wishlist)
  }
}

export function removeFromWishlist(productId: number): void {
  const wishlist = getWishlist()
  const filtered = wishlist.filter((item: any) => item.id !== productId)
  saveWishlist(filtered)
}

export function isInWishlist(productId: number): boolean {
  const wishlist = getWishlist()
  return wishlist.some((item: any) => item.id === productId)
}
