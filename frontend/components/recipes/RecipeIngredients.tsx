import { Recipe } from "@/types/Recipe"
import { CheckCircle, AlertCircle } from "lucide-react"

type RecipeIngredientsProps = {
  recipe: Recipe
}

export default function RecipeIngredients({ recipe }: RecipeIngredientsProps) {

  const ingredients = recipe.ingredients ?? []
  const missingIngredients = recipe.missingIngredients ?? []

  return (
    <div className="space-y-6">

      {/* Ingredients */}
      <div className="grid gap-3">

        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
          >

            <CheckCircle className="w-4 h-4 text-emerald-600" />

            <span className="text-gray-800">
              {ingredient}
            </span>

          </div>
        ))}

      </div>

      {/* Missing Ingredients */}
      {missingIngredients.length > 0 && (

        <div className="space-y-3 pt-4">

          <h3 className="text-sm font-semibold text-red-600">
            Missing Ingredients
          </h3>

          <div className="grid gap-3">

            {missingIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
              >

                <AlertCircle className="w-4 h-4 text-red-500" />

                <span className="text-red-600">
                  {ingredient}
                </span>

              </div>
            ))}

          </div>

        </div>

      )}

    </div>
  )
}