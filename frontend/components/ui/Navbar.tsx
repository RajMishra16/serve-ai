"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"

import {
  LayoutDashboard,
  Refrigerator,
  ScanLine,
  ChefHat,
  BookOpen,
  History,
  Settings,
  Home,
  Menu,
  X
} from "lucide-react"

import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs"

/* ------------------------------------------------ */
/* MAGNETIC LINK */
/* ------------------------------------------------ */

function MagneticLink({ children, href, className }: any) {

  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = (e: any) => {

    const rect = ref.current!.getBoundingClientRect()

    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    ref.current!.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`

  }

  const reset = () => {
    ref.current!.style.transform = "translate(0,0)"
  }

  return (

    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </Link>

  )

}

/* ------------------------------------------------ */
/* NAVBAR */
/* ------------------------------------------------ */

export default function Navbar() {

  const pathname = usePathname()
  const { isSignedIn } = useUser()

  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Pantry", href: "/pantry", icon: Refrigerator },
    { name: "Scan", href: "/scan", icon: ScanLine },
    { name: "Recipes", href: "/recipes", icon: ChefHat },
    { name: "Library", href: "/saved", icon: BookOpen },
    { name: "History", href: "/history", icon: History },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (

    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200 shadow-sm overflow-hidden">

      {/* animated gradient glow */}

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/20 via-green-200/20 to-lime-200/20 animate-pulse pointer-events-none"/>

      {/* moving beam */}

      <div className="absolute top-0 left-[-50%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_6s_linear_infinite]" />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

        {/* LOGO */}

        <MagneticLink
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-gray-900 transition group"
        >

          <span className="text-2xl group-hover:rotate-12 transition-transform">
            🍳
          </span>

          <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
            ServeAI
          </span>

        </MagneticLink>

        {/* DESKTOP NAV */}

        <div className="hidden md:flex items-center gap-2">

          {navLinks.map((link) => {

            const Icon = link.icon
            const isActive = pathname === link.href

            return (

              <MagneticLink
                key={link.href}
                href={link.href}
                className={`
                relative group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                transition-all duration-300
                ${
                  isActive
                    ? "text-emerald-600"
                    : "text-gray-600 hover:text-gray-900"
                }
                `}
              >

                {/* liquid hover background */}

                <span className="absolute inset-0 rounded-xl bg-emerald-100 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"/>

                {/* active highlight */}

                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-emerald-50"/>
                )}

                <Icon
                  size={16}
                  className="relative z-10 group-hover:rotate-12 transition-transform"
                />

                <span className="relative z-10">
                  {link.name}
                </span>

                {/* underline animation */}

                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-emerald-400 to-green-400 scale-x-0 group-hover:scale-x-100 transition origin-left"/>

              </MagneticLink>

            )

          })}

        </div>

        {/* RIGHT SECTION */}

        <div className="flex items-center gap-3">

          {!isSignedIn ? (

            <div className="hidden md:flex items-center gap-3">

              <SignInButton mode="modal">

                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                  Sign In
                </button>

              </SignInButton>

              <SignUpButton mode="modal">

                <button className="
                relative overflow-hidden
                text-sm font-medium
                bg-gradient-to-r from-emerald-500 to-green-500
                text-white px-4 py-2 rounded-lg
                hover:scale-105 hover:shadow-lg
                transition-all
                ">

                  <span className="relative z-10">
                    Get Started
                  </span>

                  {/* button shine */}

                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"/>

                </button>

              </SignUpButton>

            </div>

          ) : (

            <UserButton />

          )}

          {/* MOBILE MENU BUTTON */}

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >

            {mobileOpen ? <X size={20}/> : <Menu size={20}/>}

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (

        <div className="md:hidden border-t border-gray-200 bg-white/90 backdrop-blur-xl">

          <div className="flex flex-col p-4 gap-2">

            {navLinks.map((link) => {

              const Icon = link.icon
              const isActive = pathname === link.href

              return (

                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition
                  ${
                    isActive
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                  `}
                >

                  <Icon size={18} />

                  {link.name}

                </Link>

              )

            })}

          </div>

        </div>

      )}

    </nav>

  )

}