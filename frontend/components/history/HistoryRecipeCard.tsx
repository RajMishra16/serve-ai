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
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition space-y-3">

      {/* Title */}
      <h3 className="font-semibold text-gray-900 leading-snug">
        {recipe.title}
      </h3>

      {/* Meta */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        {recipe.cookTime} min
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-2">

        <Link href={`/recipes/${recipe.id}`}>

          <button className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
            <Eye className="w-3 h-3" />
            View Recipe
          </button>

        </Link>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>

      </div>

    </div>
  )
}