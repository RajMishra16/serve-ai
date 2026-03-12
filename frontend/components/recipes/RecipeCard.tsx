import Link from "next/link"
import { Recipe } from "@/types/Recipe"

type RecipeCardProps = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer bg-white">

        <h3 className="font-semibold text-gray-800">
          {recipe.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Cook Time: {recipe.cookTime} min
        </p>

        <p className="text-sm text-gray-500">
          Difficulty: {recipe.difficulty}
        </p>

        {recipe.missingIngredients.length > 0 && (
          <p className="text-xs text-red-500 mt-2">
            Missing {recipe.missingIngredients.length} ingredients
          </p>
        )}

      </div>
    </Link>
  )
}