import Link from "next/link"
import { LibraryRecipe } from "@/types/LibraryRecipe"

type LibraryRecipeCardProps = {
  recipe: LibraryRecipe
}

export default function LibraryRecipeCard({ recipe }: LibraryRecipeCardProps) {

  const isVeg = recipe.diet?.toLowerCase() === "veg"

  const typeColor =
    recipe.type === "Breakfast"
      ? "border-yellow-400"
      : recipe.type === "Lunch"
      ? "border-orange-400"
      : recipe.type === "Dinner"
      ? "border-blue-400"
      : recipe.type === "Snack"
      ? "border-purple-400"
      : "border-gray-200"

  const typeEmoji =
    recipe.type === "Breakfast"
      ? "🍳"
      : recipe.type === "Lunch"
      ? "🥗"
      : recipe.type === "Dinner"
      ? "🍝"
      : recipe.type === "Snack"
      ? "🍿"
      : "🍽️"

  return (
    <Link href={`/library/${recipe.id}`}>

      <div
        className={`group relative border-2 ${typeColor} rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer`}
      >

        {/* glow hover layer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-400/10 via-green-400/10 to-lime-400/10 pointer-events-none"></div>

        {/* Image */}
        <div className="relative overflow-hidden">

          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-44 object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Diet Badge */}
          <span
            className={`absolute top-3 right-3 text-xs px-2 py-1 rounded font-medium shadow transition transform group-hover:scale-105 ${
              isVeg
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {recipe.diet}
          </span>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition"></div>

        </div>

        {/* Content */}
        <div className="p-4 space-y-2 relative">

          <h3 className="font-semibold text-gray-900 leading-snug transition group-hover:text-emerald-600">
            {recipe.title}
          </h3>

          <div className="flex items-center justify-between text-sm text-gray-500">

            <span className="transition group-hover:text-gray-700">
              {recipe.country}
            </span>

            <span className="bg-gray-100 px-2 py-1 rounded text-xs transition group-hover:bg-emerald-100 group-hover:text-emerald-700">
              {typeEmoji} {recipe.type}
            </span>

          </div>

        </div>

        {/* animated bottom energy line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-green-500 group-hover:w-full transition-all duration-500"></div>

      </div>

    </Link>
  )
}