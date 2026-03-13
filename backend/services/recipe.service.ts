import { generateRecipesAI } from "@/services/ai.service"
import { Recipe } from "@/types/recipe"
import { getPantryItems } from "@/services/pantry.service"
import { db } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"


/* ---------------------------------
   Generate Recipes From Pantry
---------------------------------- */

export async function generateRecipesFromPantry(
  userId: string
): Promise<Recipe[]> {

  const pantryItems = await getPantryItems(userId)

  const pantryIngredients = pantryItems.map((item: any) =>
    item.name.toLowerCase()
  )

  if (pantryIngredients.length === 0) {
    throw new Error("Pantry is empty")
  }

  const recipes = await generateRecipesAI(pantryIngredients)

  const updatedRecipes = recipes.map((recipe: any) => {

    const recipeIngredients = (recipe.ingredients || []).map((ing: string) =>
      ing.toLowerCase()
    )

    const missingIngredients = recipeIngredients.filter(
      (ingredient: string) => !pantryIngredients.includes(ingredient)
    )

    return {
      id: uuidv4(),
      title: recipe.title,
      image: null,
      ingredients: recipe.ingredients || [],
      steps: recipe.steps || [],
      missingIngredients,
      cookTime: recipe.cookTime || 20,
      difficulty: recipe.difficulty || "medium"
    }
  })

  return updatedRecipes
}



/* ---------------------------------
   Generate Recipes From Ingredients
---------------------------------- */

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

    const recipeIngredients = (recipe.ingredients || []).map((ing: string) =>
      ing.toLowerCase()
    )

    const missingIngredients = recipeIngredients.filter(
      (ingredient: string) =>
        !normalizedIngredients.includes(ingredient)
    )

    return {
      id: uuidv4(),
      title: recipe.title,
      image: null,
      ingredients: recipe.ingredients || [],
      steps: recipe.steps || [],
      missingIngredients,
      cookTime: recipe.cookTime || 20,
      difficulty: recipe.difficulty || "medium"
    }
  })

  return updatedRecipes
}



/* -----------------------------
   SAVE GENERATED RECIPE
-------------------------------- */

export async function saveGeneratedRecipe(
  userId: string,
  recipe: any
) {

  const query = `
    INSERT INTO recipe_history (
      id,
      generation_id,
      user_id,
      title,
      image,
      ingredients,
      missing_ingredients,
      steps,
      cook_time,
      difficulty
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  await db.execute(query, [
    recipe.id,
    recipe.generationId,
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



/* -----------------------------
   GET RECIPE HISTORY
-------------------------------- */

export async function getRecipeHistory(userId: string) {

  try {

    const query = `
      SELECT
        generation_id,
        id,
        title,
        image,
        cook_time,
        difficulty,
        created_at
      FROM recipe_history
      WHERE user_id = ?
      ORDER BY created_at DESC
    `

    const [rows]: any = await db.execute(query, [userId])

    if (!rows || rows.length === 0) {
      return []
    }

    const generations: Record<string, any> = {}

    for (const recipe of rows) {

      const generationId = recipe.generation_id || "default"

      if (!generations[generationId]) {
        generations[generationId] = {
          generationId: generationId,
          recipes: []
        }
      }

      generations[generationId].recipes.push({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        cookTime: recipe.cook_time,
        difficulty: recipe.difficulty
      })
    }

    return Object.values(generations)

  } catch (error) {

    console.error("Error fetching recipe history:", error)
    throw new Error("Failed to fetch recipe history")

  }
}



/* -----------------------------
   GET RECIPE BY ID
-------------------------------- */

export async function getRecipeById(
  userId: string,
  recipeId: string
) {

  try {

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

    if (!rows || rows.length === 0) {
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
      cookTime: recipe.cook_time || 20,
      difficulty: recipe.difficulty || "medium"
    }

  } catch (error) {

    console.error("Error fetching recipe by id:", error)
    throw new Error("Failed to fetch recipe")

  }
}