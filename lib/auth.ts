// Simple client-side authentication
import type { User } from "./data"

const USERS_KEY = "ecommerce_users"
const CURRENT_USER_KEY = "ecommerce_current_user"

export function getStoredUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

export function saveUser(user: User): void {
  const users = getStoredUsers()
  const existingIndex = users.findIndex((u) => u.email === user.email)
  if (existingIndex >= 0) {
    users[existingIndex] = user
  } else {
    users.push(user)
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem(CURRENT_USER_KEY)
  return user ? JSON.parse(user) : null
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export function loginUser(email: string, password: string): { user: User | null; error: string } {
  const users = getStoredUsers()
  const user = users.find((u) => u.email === email)

  if (!user) {
    console.log("[v0] User not found for email:", email)
    return { user: null, error: "Email not found. Please sign up or check your email." }
  }

  if (user.password !== password) {
    console.log("[v0] Incorrect password for email:", email)
    return { user: null, error: "Incorrect password. Please try again." }
  }

  console.log("[v0] Login successful for user:", email)
  setCurrentUser(user)
  return { user, error: "" }
}

export function registerUser(email: string, name: string, password: string): User | null {
  const users = getStoredUsers()
  if (users.some((u) => u.email === email)) {
    return null // User already exists
  }
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    password,
  }
  saveUser(newUser)
  setCurrentUser(newUser)
  return newUser
}

export function logoutUser(): void {
  setCurrentUser(null)
}

const ORDERS_KEY = "ecommerce_orders"

export function getOrders() {
  if (typeof window === "undefined") return []
  const orders = localStorage.getItem(ORDERS_KEY)
  return orders ? JSON.parse(orders) : []
}

export function saveOrder(order: any): void {
  const orders = getOrders()
  orders.push(order)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}
