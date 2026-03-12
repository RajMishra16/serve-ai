import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex gap-6">

        <Link href="/dashboard" className="text-gray-700 hover:text-black">
          Dashboard
        </Link>

        <Link href="/pantry" className="text-gray-700 hover:text-black">
          Pantry
        </Link>

        <Link href="/scan" className="text-gray-700 hover:text-black">
          Scan
        </Link>

        <Link href="/recipes" className="text-gray-700 hover:text-black">
          Recipes
        </Link>

        <Link href="/saved" className="text-gray-700 hover:text-black">
          Library
        </Link>

        <Link href="/history" className="text-gray-700 hover:text-black">
          History
        </Link>

        <Link href="/settings" className="text-gray-700 hover:text-black">
          Settings
        </Link>

      </div>
    </nav>
  )
}