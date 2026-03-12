import { LibraryRecipe } from "@/types/LibraryRecipe"
import LibraryRecipeCard from "./LibraryRecipeCard"

type LibraryGridProps = {
  recipes: LibraryRecipe[]
}

export default function LibraryGrid({ recipes }: LibraryGridProps) {

  const safeRecipes = Array.isArray(recipes)
    ? recipes.filter((recipe) => recipe && recipe.id)
    : []

  if (safeRecipes.length === 0) {
  return (
    <div className="flex justify-center mt-10">

      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 shadow-sm">

        <div className="text-4xl mb-3">
          🍽️
        </div>

        <p className="font-medium text-gray-700">
          No recipes found
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Try changing the filters to discover more recipes.
        </p>

      </div>

    </div>
  )
}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {safeRecipes.map((recipe) => (
        <LibraryRecipeCard
          key={recipe.id}
          recipe={recipe}
        />
      ))}

    </div>
  )
}