"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import PageHeader from "@/components/ui/PageHeader"
import QuickActionCard from "@/components/dashboard/QuickActionCard"
import StatsCard from "@/components/dashboard/StatsCard"
import RecentRecipes from "@/components/dashboard/RecentRecipes"
import { Recipe } from "@/types/Recipe"
import { getPantryItems } from "@/services/pantry.service"
import { getRecipeHistory } from "@/services/receipe.service"

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
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        <PageHeader
          title="Dashboard"
          subtitle="Manage your pantry and generate AI-powered recipes"
        />

        <div className="rounded-2xl p-8 bg-gradient-to-r from-emerald-500 to-green-400 text-white shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">
            Welcome to ServeAI
          </h2>

          <p className="text-sm text-white/90">
            Turn the ingredients in your kitchen into delicious recipes with AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <StatsCard
            title="Pantry Items"
            value={pantryCount}
          />

          <StatsCard
            title="Saved Recipes"
            value={savedRecipesCount}
          />

        </div>

        <div className="space-y-4">

          <h2 className="text-lg font-semibold text-gray-900">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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

        </div>

        <div className="space-y-4">

          <h2 className="text-lg font-semibold text-gray-900">
            Recent Recipes
          </h2>

          <RecentRecipes recipes={recentRecipes} />

        </div>

      </div>

    </div>
  )
}