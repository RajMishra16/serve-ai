import { Recipe } from "@/types/Recipe"
import RecipeCard from "./RecipeCard"

type RecipeGridProps = {
  recipes: Recipe[]
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {

  const safeRecipes = Array.isArray(recipes)
    ? recipes.filter((recipe) => recipe && recipe.id)
    : []

  if (safeRecipes.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500 shadow-sm">
        No recipes available.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {safeRecipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
        />
      ))}

    </div>
  )
}