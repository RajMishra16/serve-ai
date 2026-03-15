"use client"

import { useEffect, useState, useRef } from "react"
import { useUser } from "@clerk/nextjs"
import PageHeader from "@/components/ui/PageHeader"
import QuickActionCard from "@/components/dashboard/QuickActionCard"
import StatsCard from "@/components/dashboard/StatsCard"
import RecentRecipes from "@/components/dashboard/RecentRecipes"
import { Recipe } from "@/types/Recipe"
import { getPantryItems } from "@/services/pantry.service"
import { getRecipeHistory } from "@/services/receipe.service"

import {
Apple,
Carrot,
Pizza,
Fish,
Cookie,
ChefHat,
Utensils
} from "lucide-react"

/* ============================= */
/* CURSOR TRAIL */
/* ============================= */

function CursorTrail() {

const container = useRef<HTMLDivElement>(null)

useEffect(() => {


const move = (e: MouseEvent) => {

  const dot = document.createElement("div")

  dot.className =
    "fixed w-2 h-2 bg-emerald-400 rounded-full blur-sm pointer-events-none"

  dot.style.left = `${e.clientX}px`
  dot.style.top = `${e.clientY}px`

  container.current?.appendChild(dot)

  setTimeout(() => dot.remove(), 500)

}

window.addEventListener("mousemove", move)

return () => window.removeEventListener("mousemove", move)


}, [])

return <div ref={container} />
}

/* ============================= */
/* SPOTLIGHT */
/* ============================= */

function Spotlight() {

const [pos, setPos] = useState({ x: 0, y: 0 })

useEffect(() => {


const move = (e: MouseEvent) => {
  setPos({ x: e.clientX, y: e.clientY })
}

window.addEventListener("mousemove", move)

return () => window.removeEventListener("mousemove", move)


}, [])

return (
<div
className="pointer-events-none fixed inset-0"
style={{
background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgba(16,185,129,0.15), transparent 70%)`
}}
/>
)
}

/* ============================= */
/* PARTICLES */
/* ============================= */

function Particles() {

const [items, setItems] = useState<any[]>([])

useEffect(() => {


const generated = Array.from({ length: 35 }).map(() => ({
  width: 60 + Math.random() * 120,
  height: 60 + Math.random() * 120,
  left: Math.random() * 100,
  top: Math.random() * 100
}))

setItems(generated)


}, [])

return (


<div className="absolute inset-0 pointer-events-none">

  {items.map((p, i) => (

    <div
      key={i}
      className="absolute bg-emerald-300/20 rounded-full blur-3xl animate-pulse"
      style={{
        width: `${p.width}px`,
        height: `${p.height}px`,
        left: `${p.left}%`,
        top: `${p.top}%`
      }}
    />

  ))}

</div>


)
}

/* ============================= */
/* INGREDIENT RAIN */
/* ============================= */

function IngredientRain() {

const [items, setItems] = useState<any[]>([])
const icons = [Apple, Carrot, Pizza, Fish, Cookie]

useEffect(() => {


const generated = Array.from({ length: 14 }).map((_, i) => ({
  icon: icons[i % icons.length],
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 30 + Math.random() * 40
}))

setItems(generated)


}, [])

return (


<div className="absolute inset-0 pointer-events-none">

  {items.map((item, i) => {

    const Icon = item.icon

    return (

      <Icon
        key={i}
        className="absolute text-emerald-300/40 animate-bounce"
        style={{
          left: `${item.left}%`,
          top: `${item.top}%`,
          fontSize: `${item.size}px`
        }}
      />

    )

  })}

</div>


)
}

/* ============================= */
/* DASHBOARD */
/* ============================= */

export default function DashboardPage() {

const { user, isLoaded } = useUser()

const [pantryCount, setPantryCount] = useState(0)
const [savedRecipesCount, setSavedRecipesCount] = useState(0)
const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([])

useEffect(() => {


if (!isLoaded || !user) return

const fetchDashboardData = async () => {

  try {

    const pantryItems = await getPantryItems(user.id)
    setPantryCount(pantryItems.length)

    const history = await getRecipeHistory(user.id)

    const totalRecipes = history.reduce(
      (count: number, generation: any) =>
        count + (generation.recipes?.length || 0),
      0
    )

    setSavedRecipesCount(totalRecipes)

    if (history.length > 0 && history[0].recipes) {
      setRecentRecipes(history[0].recipes.slice(0, 3))
    }

  } catch (error) {
    console.error("Failed to fetch dashboard data:", error)
  }

}

fetchDashboardData()


}, [user, isLoaded])

return (


<div className="relative min-h-screen bg-gray-50 overflow-hidden">

  {/* animations */}

  <CursorTrail />
  <Spotlight />
  <Particles />
  <IngredientRain />

  {/* floating icons */}

  <ChefHat className="absolute top-32 left-20 text-emerald-400 animate-bounce" />
  <Utensils className="absolute bottom-20 right-32 text-green-400 animate-bounce" />

  <main className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col gap-16">

    <PageHeader
      title="Dashboard"
      subtitle="Manage your pantry and generate AI-powered recipes"
    />

    {/* hero */}

    <section className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 text-white rounded-3xl p-12 shadow-xl">

      <h2 className="text-3xl font-bold">
        Welcome to ServeAI
      </h2>

      <p className="text-white/90 mt-3 max-w-lg leading-relaxed">
        Turn the ingredients in your kitchen into delicious recipes with AI.
      </p>

    </section>

    {/* stats */}

    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

      <StatsCard title="Pantry Items" value={pantryCount} />
      <StatsCard title="Saved Recipes" value={savedRecipesCount} />

    </section>

    {/* actions */}

    <section className="flex flex-col gap-6">

      <h2 className="text-xl font-bold text-gray-900">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <QuickActionCard
          title="Scan Ingredients"
          description="Upload a photo to detect ingredients"
          href="/scan"
        />

        <QuickActionCard
          title="View Pantry"
          description="Manage ingredients in your kitchen"
          href="/pantry"
        />

        <QuickActionCard
          title="Generate Recipes"
          description="Create recipes from pantry ingredients"
          href="/recipes"
        />

      </div>

    </section>

    {/* recent */}

    <section className="flex flex-col gap-6">

      <h2 className="text-xl font-bold text-gray-900">
        Recent Recipes
      </h2>

      <RecentRecipes recipes={recentRecipes} />

    </section>

  </main>

</div>


)

}
