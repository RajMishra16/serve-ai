import { Recipe } from "@/types/Recipe"
import SectionTitle from "../ui/SectionTitle"

type RecipeIngredientsProps = {
  recipe: Recipe
}

export default function RecipeIngredients({ recipe }: RecipeIngredientsProps) {
  return (
    <div className="mb-8">

      <SectionTitle title="Ingredients" />

      <ul className="list-disc pl-6 space-y-1">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-700">
            {ingredient}
          </li>
        ))}
      </ul>

      {recipe.missingIngredients.length > 0 && (
        <div className="mt-6">

          <SectionTitle title="Missing Ingredients" />

          <ul className="list-disc pl-6 space-y-1">
            {recipe.missingIngredients.map((ingredient, index) => (
              <li key={index} className="text-red-500">
                {ingredient}
              </li>
            ))}
          </ul>

        </div>
      )}

    </div>
  )
}