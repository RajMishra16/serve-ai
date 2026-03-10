"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

        <h1 className="text-xl font-bold">ServeAI</h1>

        <div className="flex gap-6 text-sm font-medium">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/pantry">Pantry</Link>
          <Link href="/scan">Scan</Link>
          <Link href="/recipes">Recipes</Link>
          <Link href="/saved">Saved</Link>
          <Link href="/settings">Settings</Link>
        </div>

      </div>
    </nav>
  );
}