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
        className={`group border-2 ${typeColor} rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer`}
      >

        {/* Image */}
        <div className="relative">

          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-44 object-cover"
          />

          {/* Diet Badge */}
          <span
            className={`absolute top-3 right-3 text-xs px-2 py-1 rounded font-medium shadow ${
              isVeg
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {recipe.diet}
          </span>

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

        </div>

        {/* Content */}
        <div className="p-4 space-y-2">

          <h3 className="font-semibold text-gray-900 leading-snug group-hover:text-emerald-600 transition">
            {recipe.title}
          </h3>

          <div className="flex items-center justify-between text-sm text-gray-500">

            <span>
              {recipe.country}
            </span>

            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
              {typeEmoji} {recipe.type}
            </span>

          </div>

        </div>

      </div>

    </Link>
  )
}