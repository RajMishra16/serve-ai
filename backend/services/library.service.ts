import { db } from "@/lib/db"

export async function getLibraryRecipes() {

  const query = `
    SELECT id, title, image, country, type, diet
    FROM recipe_library
    ORDER BY title ASC
  `

  const [rows]: any = await db.execute(query)

  return rows
}



export async function getLibraryRecipeById(id: string) {

  const query = `
    SELECT *
    FROM recipe_library
    WHERE id = ?
    LIMIT 1
  `

  const [rows]: any = await db.execute(query, [id])

  if (!rows.length) {
    throw new Error("Recipe not found")
  }

  const recipe = rows[0]

  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    country: recipe.country,
    type: recipe.type,
    diet: recipe.diet,

    ingredients:
      typeof recipe.ingredients === "string"
        ? JSON.parse(recipe.ingredients)
        : recipe.ingredients,

    steps:
      typeof recipe.steps === "string"
        ? JSON.parse(recipe.steps)
        : recipe.steps,

    cookTime: recipe.cook_time,
    difficulty: recipe.difficulty
  }
}