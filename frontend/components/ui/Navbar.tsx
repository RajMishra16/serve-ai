"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Refrigerator,
  ScanLine,
  ChefHat,
  BookOpen,
  History,
  Settings
} from "lucide-react"

import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs"

export default function Navbar() {

  const pathname = usePathname()
  const { isSignedIn } = useUser()

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Pantry", href: "/pantry", icon: Refrigerator },
    { name: "Scan", href: "/scan", icon: ScanLine },
    { name: "Recipes", href: "/recipes", icon: ChefHat },
    { name: "Library", href: "/saved", icon: BookOpen },
    { name: "History", href: "/history", icon: History },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold text-gray-900 text-lg"
        >
          🍳 <span>ServeAI</span>
        </Link>

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2">

            {navLinks.map((link) => {

              const Icon = link.icon
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    isActive
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >

                  <Icon size={16} />

                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-emerald-500 rounded-full"/>
                  )}

                </Link>
              )
            })}

          </div>

          {/* Auth Controls */}

          {!isSignedIn ? (
            <div className="flex items-center gap-3">

              <SignInButton mode="modal">
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="text-sm font-medium bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">
                  Sign Up
                </button>
              </SignUpButton>

            </div>
          ) : (
            <UserButton />
          )}

        </div>

      </div>

    </nav>
  )
}