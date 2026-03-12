import { Recipe } from "@/types/Recipe"
import SectionTitle from "../ui/SectionTitle"

type RecipeStepsProps = {
  recipe: Recipe
}

export default function RecipeSteps({ recipe }: RecipeStepsProps) {
  return (
    <div className="mb-8">

      <SectionTitle title="Steps" />

      <ol className="list-decimal pl-6 space-y-2">
        {recipe.steps.map((step, index) => (
          <li key={index} className="text-gray-700">
            {step}
          </li>
        ))}
      </ol>

    </div>
  )
}