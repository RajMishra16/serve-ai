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

      {/* Available Ingredients */}
      <div className="grid gap-3">

        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="
            flex items-center gap-3
            bg-gray-50
            border border-gray-200
            rounded-xl
            px-4 py-3
            hover:bg-gray-100
            transition
            "
          >

            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />

            <span className="text-gray-800 font-medium">
              {ingredient}
            </span>

          </div>
        ))}

      </div>

      {/* Missing Ingredients */}
      {missingIngredients.length > 0 && (

        <div className="space-y-3 pt-4 border-t border-gray-200">

          <h3 className="text-sm font-semibold text-red-600">
            Missing Ingredients
          </h3>

          <div className="grid gap-3">

            {missingIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="
                flex items-center gap-3
                bg-red-50
                border border-red-200
                rounded-xl
                px-4 py-3
                hover:bg-red-100
                transition
                "
              >

                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />

                <span className="text-red-600 font-medium">
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