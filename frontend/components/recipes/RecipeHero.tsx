import { Recipe } from "@/types/Recipe"

type RecipeHeroProps = {
  recipe: Recipe
}

export default function RecipeHero({ recipe }: RecipeHeroProps) {
  return (
    <div className="mb-8">

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-72 object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold text-gray-900 mt-4">
        {recipe.title}
      </h1>

    </div>
  )
}