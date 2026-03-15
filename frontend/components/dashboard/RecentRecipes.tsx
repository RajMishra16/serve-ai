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

          <div className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">

            {/* glow gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-400/10 via-green-400/10 to-lime-400/10"></div>

            {/* radial AI light */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_70%)]"></div>

            <div className="relative flex items-start justify-between">

              <ChefHat className="w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-emerald-600 group-hover:scale-110" />

              <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-gray-600 transition">
                <Clock className="w-3 h-3" />
                {recipe.cookTime} min
              </div>

            </div>

            <h3 className="relative font-semibold text-gray-900 mt-4 leading-snug transition-all duration-300 group-hover:text-emerald-600">
              {recipe.title}
            </h3>

            {/* bottom animated energy bar */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-green-500 group-hover:w-full transition-all duration-500"></div>

          </div>

        </Link>
      ))}

    </div>
  )
}