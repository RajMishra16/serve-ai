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

    <div className="relative w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-200">

      {/* Blurred background */}
      {r.image && (
        <img
          src={r.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-3xl scale-110 opacity-40"
        />
      )}

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/90"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center text-center py-12 px-6 space-y-6">

        {/* Recipe Image */}
        {r.image && (
          <img
            src={r.image}
            alt={r.title}
            className="max-h-[320px] w-auto rounded-xl shadow-lg border border-gray-200"
          />
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {r.title}
        </h1>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 text-sm">

          {r.country && (
            <span className="bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-700">
              🌍 {r.country}
            </span>
          )}

          {r.type && (
            <span className="bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-700">
              🍽 {r.type}
            </span>
          )}

          {r.diet && (
            <span
              className={`px-3 py-1 rounded-full font-semibold ${
                isVeg
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isVeg ? "🥦 Veg" : "🍗 Non-Veg"}
            </span>
          )}

        </div>

      </div>

    </div>
  )
}