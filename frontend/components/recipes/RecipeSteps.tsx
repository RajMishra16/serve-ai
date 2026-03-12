import { Recipe } from "@/types/Recipe"

type RecipeStepsProps = {
  recipe: Recipe
}

export default function RecipeSteps({ recipe }: RecipeStepsProps) {

  const steps = recipe.steps ?? []

  return (
    <div className="space-y-4">

      {steps.map((step, index) => (
        <div
          key={index}
          className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl p-5"
        >

          {/* Step Number */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
            {index + 1}
          </div>

          {/* Step Text */}
          <p className="text-gray-800 leading-relaxed">
            {step}
          </p>

        </div>
      ))}

    </div>
  )
}