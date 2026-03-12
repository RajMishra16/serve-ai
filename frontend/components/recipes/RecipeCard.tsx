import Link from "next/link"
import { Recipe } from "@/types/Recipe"
import { Clock } from "lucide-react"

type RecipeCardProps = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {

  const missingIngredients = recipe.missingIngredients ?? []

  const cookTime = recipe.cookTime ? `${recipe.cookTime} min` : "Unknown"
  const difficulty = recipe.difficulty || "Unknown"

  return (
    <Link href={`/recipes/${recipe.id}`}>

      <div className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition cursor-pointer space-y-3">

        {/* Title */}
        <h3 className="font-semibold text-gray-900 leading-snug group-hover:text-emerald-600 transition">
          {recipe.title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">

          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {cookTime}
          </div>

          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
            {difficulty}
          </span>

        </div>

        {/* Missing Ingredients */}
        {missingIngredients.length > 0 && (
          <p className="text-xs text-red-500">
            Missing {missingIngredients.length} ingredients
          </p>
        )}

      </div>

    </Link>
  )
}