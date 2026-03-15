import Link from "next/link"
import { Recipe } from "@/types/Recipe"
import { Clock } from "lucide-react"

type RecipeCardProps = {
  recipe: Recipe
  loading?: boolean
}

export default function RecipeCard({ recipe, loading }: RecipeCardProps) {

  const missingIngredients = recipe.missingIngredients ?? []

  const cookTime = recipe.cookTime ? `${recipe.cookTime} min` : "Unknown"
  const difficulty = recipe.difficulty || "Unknown"

  const difficultyColor =
    difficulty.toLowerCase() === "easy"
      ? "border-green-400"
      : difficulty.toLowerCase() === "medium"
      ? "border-yellow-400"
      : difficulty.toLowerCase() === "hard"
      ? "border-red-400"
      : "border-gray-200"

  return (
    <Link href={`/recipes/${recipe.id}`}>

      <div
        className={`group relative border-2 ${difficultyColor} rounded-xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer p-5 overflow-hidden`}
      >

        {/* Hover Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-400/10 via-green-400/10 to-lime-400/10 pointer-events-none rounded-xl"></div>

        <div className="relative space-y-3">

          {/* Title */}
          <h3 className="font-semibold text-gray-900 leading-snug transition group-hover:text-emerald-600">
            {recipe.title}
          </h3>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500">

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {cookTime}
            </div>

            <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
              {difficulty}
            </span>

          </div>

          {/* Missing Ingredients */}
          {missingIngredients.length > 0 && (
            <div className="text-xs text-red-500 font-medium">
              Missing {missingIngredients.length} ingredient
              {missingIngredients.length > 1 ? "s" : ""}
            </div>
          )}

        </div>

        {/* Bottom Hover Energy Line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-green-500 group-hover:w-full transition-all duration-500"></div>

        {/* Loader Line */}
        {loading && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] overflow-hidden rounded-b-xl">
            <div className="h-full w-1/3 bg-emerald-500 animate-[loader_1.2s_linear_infinite]" />
          </div>
        )}

      </div>

    </Link>
  )
}