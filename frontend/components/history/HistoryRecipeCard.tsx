import Link from "next/link"
import { Recipe } from "@/types/Recipe"

type HistoryRecipeCardProps = {
  recipe: Recipe
}

export default function HistoryRecipeCard({ recipe }: HistoryRecipeCardProps) {
  return (
    <div className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition">

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">

        <h3 className="font-semibold text-gray-800">
          {recipe.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Cook Time: {recipe.cookTime} min
        </p>

        <Link href={`/recipes/${recipe.id}`}>
          <button className="mt-3 text-sm text-blue-600 hover:underline">
            View Recipe
          </button>
        </Link>

      </div>

    </div>
  )
}