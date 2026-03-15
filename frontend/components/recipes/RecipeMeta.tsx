import { Recipe } from "@/types/Recipe"
import { Clock, ChefHat } from "lucide-react"

type RecipeMetaProps = {
  recipe: Recipe
}

export default function RecipeMeta({ recipe }: RecipeMetaProps) {

  const cookTime = recipe.cookTime ? `${recipe.cookTime} min` : "Unknown"
  const difficulty = recipe.difficulty ?? "Unknown"

  return (
    <div className="flex flex-wrap gap-4">

      {/* Cook Time */}
      <div
        className="
        flex items-center gap-2
        bg-gray-50
        border border-gray-200
        rounded-xl
        px-4 py-2
        text-sm text-gray-700
        hover:bg-gray-100
        transition
        "
      >

        <Clock className="w-5 h-5 text-emerald-600 shrink-0" />

        <span className="font-medium">
          {cookTime}
        </span>

      </div>

      {/* Difficulty */}
      <div
        className="
        flex items-center gap-2
        bg-gray-50
        border border-gray-200
        rounded-xl
        px-4 py-2
        text-sm text-gray-700
        hover:bg-gray-100
        transition
        "
      >

        <ChefHat className="w-5 h-5 text-emerald-600 shrink-0" />

        <span className="font-medium capitalize">
          {difficulty}
        </span>

      </div>

    </div>
  )
}