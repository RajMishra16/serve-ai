import { Recipe } from "@/types/Recipe"

type RecipeMetaProps = {
  recipe: Recipe
}

export default function RecipeMeta({ recipe }: RecipeMetaProps) {
  return (
    <div className="flex gap-6 text-sm text-gray-600 mb-8">

      <div>
        <span className="font-semibold">Cook Time:</span> {recipe.cookTime} min
      </div>

      <div>
        <span className="font-semibold">Difficulty:</span> {recipe.difficulty}
      </div>

    </div>
  )
}