import { generateRecipesAI } from "@/services/ai.service"
import { Recipe } from "@/types/recipe"
import { getPantryItems } from "@/services/pantry.service"
import { db } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"



export async function generateRecipesFromPantry(
  userId: string
): Promise<Recipe[]> {

  const pantryItems = (await getPantryItems(userId)) as any[]

  const pantryIngredients = pantryItems.map((item: any) =>
    item.name.toLowerCase()
  )

  if (pantryIngredients.length === 0) {
    throw new Error("Pantry is empty")
  }

  const recipes = await generateRecipesAI(pantryIngredients)

  const updatedRecipes = recipes.map((recipe: any) => {

    const recipeIngredients = recipe.ingredients.map((ing: string) =>
      ing.toLowerCase()
    )

    const missingIngredients = recipeIngredients.filter(
      (ingredient: string) => !pantryIngredients.includes(ingredient)
    )

    return {
      ...recipe,
      id: uuidv4(),
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
      id: uuidv4(),
      missingIngredients
    }
  })

  return updatedRecipes
}



/* -----------------------------
   DAY 4 FUNCTIONS
-------------------------------- */



export async function saveGeneratedRecipe(
  userId: string,
  recipe: any
) {

  const query = `
    INSERT INTO recipe_history (
      id,
      user_id,
      title,
      image,
      ingredients,
      missing_ingredients,
      steps,
      cook_time,
      difficulty
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  await db.execute(query, [
    recipe.id,
    userId,
    recipe.title,
    recipe.image,
    JSON.stringify(recipe.ingredients),
    JSON.stringify(recipe.missingIngredients),
    JSON.stringify(recipe.steps),
    recipe.cookTime,
    recipe.difficulty
  ])
}



export async function getRecipeHistory(userId: string) {

  const query = `
    SELECT id, title, image, created_at
    FROM recipe_history
    WHERE user_id = ?
    ORDER BY created_at DESC
  `

  const [rows] = await db.execute(query, [userId])

  return rows
}



export async function getRecipeById(
  userId: string,
  recipeId: string
) {

  const query = `
    SELECT *
    FROM recipe_history
    WHERE id = ? AND user_id = ?
    LIMIT 1
  `

  const [rows]: any = await db.execute(query, [
    recipeId,
    userId
  ])

  if (!rows.length) {
    throw new Error("Recipe not found")
  }

  const recipe = rows[0]

  const parseJSON = (value: any) => {
    try {
      if (typeof value === "string") {
        return JSON.parse(value)
      }
      return value
    } catch {
      return value
    }
  }

  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    ingredients: parseJSON(recipe.ingredients),
    missingIngredients: parseJSON(recipe.missing_ingredients),
    steps: parseJSON(recipe.steps),
    cookTime: recipe.cook_time,
    difficulty: recipe.difficulty
  }
}