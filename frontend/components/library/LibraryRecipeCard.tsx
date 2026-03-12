import Link from "next/link"
import { LibraryRecipe } from "@/types/LibraryRecipe"

type LibraryRecipeCardProps = {
  recipe: LibraryRecipe
}

export default function LibraryRecipeCard({ recipe }: LibraryRecipeCardProps) {
  return (
    <Link href={`/library/${recipe.id}`}>
      <div className="border rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer bg-white">

        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-40 object-cover"
        />

        <div className="p-4">

          <h3 className="font-semibold text-gray-800">
            {recipe.title}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {recipe.country} • {recipe.type}
          </p>

          <span
            className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
              recipe.diet === "Veg"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {recipe.diet}
          </span>

        </div>
      </div>
    </Link>
  )
}