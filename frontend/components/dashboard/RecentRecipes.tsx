import Link from "next/link"
import { Recipe } from "@/types/Recipe"

type RecentRecipesProps = {
  recipes: Recipe[]
}

export default function RecentRecipes({ recipes }: RecentRecipesProps) {
  return (
    <div className="space-y-4">

      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
          <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-white">

            <h3 className="font-semibold text-gray-800">
              {recipe.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Cook time: {recipe.cookTime} minutes
            </p>

          </div>
        </Link>
      ))}

    </div>
  )
}