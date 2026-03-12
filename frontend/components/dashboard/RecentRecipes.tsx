import Link from "next/link"
import { Clock, ChefHat } from "lucide-react"
import { Recipe } from "@/types/Recipe"

type RecentRecipesProps = {
  recipes: Recipe[]
}

export default function RecentRecipes({ recipes }: RecentRecipesProps) {

  if (!recipes || recipes.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-500">
        No recipes generated yet.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipes/${recipe.id}`}>

          <div className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition cursor-pointer">

            <div className="flex items-start justify-between">

              <ChefHat className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition" />

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {recipe.cookTime} min
              </div>

            </div>

            <h3 className="font-semibold text-gray-900 mt-4 leading-snug">
              {recipe.title}
            </h3>

          </div>

        </Link>
      ))}

    </div>
  )
}