import { LibraryRecipe } from "@/types/LibraryRecipe"
import LibraryRecipeCard from "./LibraryRecipeCard"

type LibraryGridProps = {
  recipes: LibraryRecipe[]
}

export default function LibraryGrid({ recipes }: LibraryGridProps) {

  const safeRecipes = Array.isArray(recipes)
    ? recipes.filter((recipe) => recipe && recipe.id)
    : []

  if (safeRecipes.length === 0) {
    return (
      <div className="relative flex justify-center mt-12 overflow-hidden">

        {/* floating glow lights */}
        <div className="absolute -top-10 left-10 w-40 h-40 bg-emerald-300/20 blur-3xl rounded-full animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-40 h-40 bg-green-300/20 blur-3xl rounded-full animate-pulse pointer-events-none"></div>

        <div className="relative max-w-md w-full bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-12 text-center text-gray-500 shadow-sm transition hover:shadow-lg">

          <div className="text-5xl mb-4 animate-bounce">
            🍽️
          </div>

          <p className="font-semibold text-gray-800 text-lg">
            No recipes found
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Try changing the filters to discover more recipes.
          </p>

        </div>

      </div>
    )
  }

  return (
    <div className="relative">

      {/* AI glow background */}
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none
      bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_60%)]"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {safeRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
          >
            <LibraryRecipeCard
              recipe={recipe}
            />
          </div>
        ))}

      </div>

    </div>
  )
}