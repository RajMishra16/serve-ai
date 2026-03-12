import { LibraryRecipe } from "@/types/LibraryRecipe"
import LibraryRecipeCard from "./LibraryRecipeCard"

type LibraryGridProps = {
  recipes: LibraryRecipe[]
}

export default function LibraryGrid({ recipes }: LibraryGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <LibraryRecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}