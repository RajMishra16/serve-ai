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

  // Country flag mapping
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
    <div className="space-y-3">

      <h2 className="text-lg font-semibold text-gray-800">
        {flag} {title}
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2">

        {recipes.map((recipe) => (
          <div key={recipe.id} className="min-w-[250px]">
            <LibraryRecipeCard recipe={recipe} />
          </div>
        ))}

      </div>

    </div>
  )
}