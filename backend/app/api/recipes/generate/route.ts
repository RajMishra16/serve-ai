import { NextResponse } from "next/server"
import { generateRecipesFromPantry, saveGeneratedRecipe } from "@/services/recipe.service"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId required" },
        { status: 400 }
      )
    }

    const generationId = uuidv4()

    const recipes = await generateRecipesFromPantry(userId)

    const finalRecipes = []

    for (const recipe of recipes) {
      const updatedRecipe = {
        ...recipe,
        image: null,
        cookTime: recipe.cookTime || 20,
        difficulty: recipe.difficulty || "medium",
        generationId
      }

      try {
        await saveGeneratedRecipe(userId, updatedRecipe)
      } catch (err) {
        console.error("SAVE ERROR:", err)
      }

      finalRecipes.push(updatedRecipe)
    }

    return NextResponse.json({
      success: true,
      generationId,
      data: finalRecipes
    })

  } catch (error: any) {
    console.error("GENERATE RECIPES ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate recipes"
      },
      { status: 500 }
    )
  }
}