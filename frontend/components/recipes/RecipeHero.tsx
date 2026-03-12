import { Recipe } from "@/types/Recipe"

type RecipeHeroProps = {
  recipe: Recipe
}

type ExtendedRecipe = Recipe & {
  diet?: string
  country?: string
  type?: string
}

export default function RecipeHero({ recipe }: RecipeHeroProps) {

  const r = recipe as ExtendedRecipe
  const isVeg = r.diet?.toLowerCase() === "veg"

  return (

    <div className="relative w-full rounded-2xl overflow-hidden">

      {/* Blurred background */}
      {r.image && (
        <img
          src={r.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40"
        />
      )}

      {/* Content container */}
      <div className="relative flex flex-col items-center text-center py-10 px-6 space-y-6">

        {/* Full image (no crop) */}
        {r.image && (
          <img
            src={r.image}
            alt={r.title}
            className="max-h-[320px] w-auto rounded-xl shadow-lg"
          />
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900">
          {r.title}
        </h1>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 text-sm">

          {r.country && (
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              🌍 {r.country}
            </span>
          )}

          {r.type && (
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              🍽 {r.type}
            </span>
          )}

          {r.diet && (
            <span
              className={`px-3 py-1 rounded-full font-medium ${
                isVeg
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {r.diet}
            </span>
          )}

        </div>

      </div>

    </div>
  )
}