import { generateRecipesAI } from "@/services/ai.service"
import { Recipe } from "@/types/recipe"
import { getPantryItems } from "@/services/pantry.service"

export async function generateRecipesFromPantry(
  userId: string
): Promise<Recipe[]> {
  const pantryItems = await getPantryItems(userId)

  const ingredients = pantryItems.map((item: any) => item.name)

  if (ingredients.length === 0) {
    throw new Error("Pantry is empty")
  }

  const recipes = await generateRecipesAI(ingredients)

  return recipes
}

export async function generateRecipesFromIngredients(
  ingredients: string[]
): Promise<Recipe[]> {
  if (!ingredients || ingredients.length === 0) {
    throw new Error("No ingredients provided")
  }

  const recipes = await generateRecipesAI(ingredients)

  return recipes
}