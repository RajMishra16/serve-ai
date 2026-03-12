import { Recipe } from "@/types/Recipe"
import HistoryRecipeCard from "./HistoryRecipeCard"

type HistoryGridProps = {
  recipes: Recipe[]
  onDelete: (id: string) => void
}

export default function HistoryGrid({ recipes, onDelete }: HistoryGridProps) {

  const safeRecipes = Array.isArray(recipes)
    ? recipes.filter((recipe) => recipe && recipe.id)
    : []

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

      {safeRecipes.map((recipe) => (
        <HistoryRecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={onDelete}
        />
      ))}

    </div>
  )
}