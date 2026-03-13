import { NextResponse } from "next/server"
import { generateRecipesFromPantry } from "@/services/recipe.service"
import { saveGeneratedRecipe } from "@/services/recipe.service"
import { v4 as uuidv4 } from "uuid"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {

  try {

    const authData = await auth()
    const finalUserId = authData?.userId ?? "test-user"

    // Create generation batch ID
    const generationId = uuidv4()

    // Generate recipes
    const recipes = await generateRecipesFromPantry(finalUserId)

    const finalRecipes = []

    for (const recipe of recipes) {

      const updatedRecipe = {
        ...recipe,
        image: null,
        cookTime: recipe.cookTime || 20,
        difficulty: recipe.difficulty || "medium",
        generationId
      }

      await saveGeneratedRecipe(finalUserId, updatedRecipe)

      finalRecipes.push(updatedRecipe)
    }

    return NextResponse.json({
      success: true,
      generationId,
      data: finalRecipes,
    })

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate recipes",
      },
      { status: 500 }
    )

  }
}