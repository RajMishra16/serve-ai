import { Recipe } from "@/types/Recipe"
import HistoryRecipeCard from "./HistoryRecipeCard"

type HistoryGridProps = {
  recipes: Recipe[]
}

export default function HistoryGrid({ recipes }: HistoryGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <HistoryRecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}