import { NextResponse } from "next/server"
import { generateRecipesFromPantry } from "@/services/recipe.service"
import { saveGeneratedRecipe } from "@/services/recipe.service"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "userId is required",
        },
        { status: 400 }
      )
    }

    // Generate recipes
    const recipes = await generateRecipesFromPantry(userId)

    const finalRecipes = []

    for (const recipe of recipes) {

      const updatedRecipe = {
        ...recipe,
        image: null
      }

      await saveGeneratedRecipe(userId, updatedRecipe)

      finalRecipes.push(updatedRecipe)
    }

    return NextResponse.json({
      success: true,
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