import { LibraryRecipe } from "@/types/LibraryRecipe"
import LibraryRecipeCard from "./LibraryRecipeCard"

type LibraryCategoryRowProps = {
  title: string
  recipes: LibraryRecipe[]
}

export default function LibraryCategoryRow({
  title,
  recipes,
}: LibraryCategoryRowProps) {
  if (recipes.length === 0) return null

  const flags: Record<string, string> = {
    Indian: "🇮🇳",
    Italian: "🇮🇹",
    Mexican: "🇲🇽",
    Japanese: "🇯🇵",
    American: "🇺🇸",
    Thai: "🇹🇭",
    Chinese: "🇨🇳",
    Greek: "🇬🇷",
    Spanish: "🇪🇸",
  }

  const flag = flags[title] || "🍽️"

  return (
    <div className="space-y-4 relative">

      {/* category header */}
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">

        <span className="text-2xl">
          {flag}
        </span>

        <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text text-transparent">
          {title}
        </span>

      </h2>

      {/* accent line */}
      <div className="h-[2px] w-24 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>

      {/* horizontal recipe list */}
      <div className="relative">

        <div className="flex gap-5 overflow-x-auto pb-3 scroll-smooth">

          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="min-w-[250px] transition-transform duration-300 hover:-translate-y-1"
            >
              <LibraryRecipeCard recipe={recipe} />
            </div>
          ))}

        </div>

      </div>

    </div>
  )
}