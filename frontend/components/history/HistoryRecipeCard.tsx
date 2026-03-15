"use client"

import Link from "next/link"
import { Recipe } from "@/types/Recipe"
import { deleteRecipe } from "@/services/receipe.service"
import { Clock, Eye, Trash2 } from "lucide-react"

type HistoryRecipeCardProps = {
  recipe: Recipe
  onDelete: (id: string) => void
}

export default function HistoryRecipeCard({
  recipe,
  onDelete
}: HistoryRecipeCardProps) {

  const handleDelete = async () => {
    try {

      await deleteRecipe(recipe.id)

      onDelete(recipe.id)

    } catch (error) {
      console.error("Failed to delete recipe:", error)
    }
  }

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl space-y-4">

      {/* hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-400/10 via-green-400/10 to-lime-400/10"></div>

      {/* radial AI light */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_70%)]"></div>

      {/* Title */}
      <h3 className="relative font-semibold text-gray-900 leading-snug transition-all duration-300 group-hover:text-emerald-600">
        {recipe.title}
      </h3>

      {/* Meta */}
      <div className="relative flex items-center gap-2 text-sm text-gray-500 group-hover:text-gray-600 transition">

        <Clock className="w-4 h-4 group-hover:text-emerald-500 transition" />

        {recipe.cookTime} min

      </div>

      {/* Actions */}
      <div className="relative flex justify-between items-center pt-2">

        <Link href={`/recipes/${recipe.id}`}>

          <button className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-200">

            <Eye className="w-3 h-3" />

            View Recipe

          </button>

        </Link>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200"
        >

          <Trash2 className="w-3 h-3" />

          Delete

        </button>

      </div>

      {/* energy sweep line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-green-500 group-hover:w-full transition-all duration-500"></div>

    </div>
  )
}