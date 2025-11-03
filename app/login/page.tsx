"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { loginUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogIn } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = loginUser(email, password)
    if (result.user) {
      console.log("[v0] Login successful, redirecting to dashboard")
      router.push("/dashboard")
    } else {
      console.log("[v0] Login failed with error:", result.error)
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-card rounded-lg shadow-md p-8">
          <div className="flex justify-center mb-6">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
          <p className="text-center text-muted-foreground mb-8">Sign in to your account</p>

          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-semibold">
              Sign up
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3">Demo Credentials:</p>
            <p className="text-xs text-muted-foreground">
              Email: <span className="font-mono">demo@example.com</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Password: <span className="font-mono">demo123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
