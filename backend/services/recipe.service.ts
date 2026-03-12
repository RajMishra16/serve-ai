import { generateRecipesAI } from "@/services/ai.service"
import { Recipe } from "@/types/recipe"
import { getPantryItems } from "@/services/pantry.service"

export async function generateRecipesFromPantry(
  userId: string
): Promise<Recipe[]> {

  // Get pantry items from database
  const pantryItems = (await getPantryItems(userId)) as any[]

  // Normalize pantry ingredients
  const pantryIngredients = pantryItems.map((item: any) =>
    item.name.toLowerCase()
  )

  if (pantryIngredients.length === 0) {
    throw new Error("Pantry is empty")
  }

  // Generate recipes using AI
  const recipes = await generateRecipesAI(pantryIngredients)

  // Detect missing ingredients
  const updatedRecipes = recipes.map((recipe: any) => {

    const recipeIngredients = recipe.ingredients.map((ing: string) =>
      ing.toLowerCase()
    )

    const missingIngredients = recipeIngredients.filter(
      (ingredient: string) => !pantryIngredients.includes(ingredient)
    )

    return {
      ...recipe,
      missingIngredients
    }
  })

  return updatedRecipes
}

export async function generateRecipesFromIngredients(
  ingredients: string[]
): Promise<Recipe[]> {

  if (!ingredients || ingredients.length === 0) {
    throw new Error("No ingredients provided")
  }

  const normalizedIngredients = ingredients.map((i) =>
    i.toLowerCase()
  )

  const recipes = await generateRecipesAI(normalizedIngredients)

  const updatedRecipes = recipes.map((recipe: any) => {

    const recipeIngredients = recipe.ingredients.map((ing: string) =>
      ing.toLowerCase()
    )

    const missingIngredients = recipeIngredients.filter(
      (ingredient: string) =>
        !normalizedIngredients.includes(ingredient)
    )

    return {
      ...recipe,
      missingIngredients
    }
  })

  return updatedRecipes
}